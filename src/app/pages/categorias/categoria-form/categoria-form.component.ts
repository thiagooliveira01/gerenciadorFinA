import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Categoria } from "../shared/categoria.model";
import { CategoriaService } from "../shared/categoria.service";

import { switchMap } from "rxjs/operators";

import toastr from "toastr";

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoriaForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  categoria: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoria();
    this.loadCategoria();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if (this.currentAction == 'new')
      this.createCategoria();
    else //edit
      this.updateCategoria();
  }

  //metodos privados
  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
      this.currentAction = 'new'
    else
      this.currentAction = 'edit'
  }

  private buildCategoria(){
    this.categoriaForm = this.formBuilder.group({
      id: [null],
      nome:[null, [Validators.required, Validators.minLength(2)]],
      descricao:[null]
    });
  }

  private loadCategoria(){
    if(this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getById(+params.get("id")))
      )
      .subscribe(
        (categoria) =>{
          this.categoria = categoria
          this.categoriaForm.patchValue(categoria) //carregando dados para formulario
        },
        (error) => alert('Ocorreu um erro no servidor.')
      )
    }
  }

  private setPageTitle(){
    if (this.currentAction == 'new')  
      this.pageTitle = 'Cadastro de nova categoria'
    else{
      const nomeCategoria = this.categoria.nome || "";
      this.pageTitle = 'Editando categoria: '+ nomeCategoria;
    }
  }

  private createCategoria(){
    const categoria : Categoria = Object.assign(new Categoria(), this.categoriaForm.value);

    this.categoriaService.create(categoria).subscribe(
      categoria => this.actionsForSuccess(categoria),
      error => this.actionsForError(error)
    )
  }

  private updateCategoria(){
    const categoria : Categoria = Object.assign(new Categoria(), this.categoriaForm.value);
    this.categoriaService.update(categoria).subscribe(
      categoria => this.actionsForSuccess(categoria),
      error => this.actionsForError(error)
    );
  }

  private actionsForSuccess(categoria: Categoria){
    toastr.success('Solicitação processada com sucesso!');

    //volta para categorias e re-abre o formulario na rota de edit
    this.router.navigateByUrl('categorias', {skipLocationChange: true}).then(
      () => this.router.navigate(['categorias', categoria.id, 'edit'])
    )
  }

  private actionsForError(error){
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    this.submittingForm = false;

    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Tente mais tarde."];
  }

}
