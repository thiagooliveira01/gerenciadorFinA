import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BaseResourceModel } from "../../models/base-resource.model";
import { BaseResouceService } from "../../servicos/base-resource.service";

import { switchMap } from "rxjs/operators";

import toastr from "toastr";

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResouceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
) { 
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
}

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if (this.currentAction == 'new')
      this.createResource();
    else //edit
      this.updateResource();
  }

  //metodos privados
  protected setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
      this.currentAction = 'new'
    else
      this.currentAction = 'edit'
  }

  protected buildResource(){

  }

  protected loadResource(){
    if(this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get("id")))
      )
      .subscribe(
        (resource) =>{
          this.resource = resource
          this.resourceForm.patchValue(resource) //carregando dados para formulario
        },
        (error) => alert('Ocorreu um erro no servidor.')
      )
    }
  }

  protected setPageTitle(){
    if (this.currentAction == 'new')  
      this.pageTitle = this.creationPageTitle();
    else{
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string{
    return "Novo";
  }
  protected editionPageTitle(): string{
    return "Edição";
  }   

  protected createResource(){
    const resource : T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource).subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    )
  }

  protected updateResource(){
    const resource : T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource).subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected actionsForSuccess(resource: T){
    toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    //volta para categorias e re-abre o formulario na rota de edit
    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
    )
  }

  protected actionsForError(error){
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    this.submittingForm = false;

    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Tente mais tarde."];
  }

  protected abstract buildResourceForm(): void;

}
