import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Lancamento } from "../shared/lancamento.model";
import { LancamentoService } from "../shared/lancamento.service";

import { switchMap } from "rxjs/operators";

import toastr from "toastr";
import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';

@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})
export class LancamentoFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  lancamentoForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  lancamento: Lancamento = new Lancamento();
  categorias: Array<Categoria>;

  imaskConfig ={
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }
  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    private lancamentoService: LancamentoService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildLancamento();
    this.loadLancamento();
    this.loadCategorias();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if (this.currentAction == 'new')
      this.createLancamento();
    else //edit
      this.updateLancamento();
  }

  get tipoOptions(): Array<any>{
    return Object.entries(Lancamento.types).map(
      ([value, text]) =>{
        return{
          text: text,
          value: value
        }
      }
    )
  }

  //metodos privados
  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
      this.currentAction = 'new'
    else
      this.currentAction = 'edit'
  }

  private buildLancamento(){
    this.lancamentoForm = this.formBuilder.group({
      id: [null],
      nome:[null, [Validators.required, Validators.minLength(2)]],
      descricao:[null],
      tipo:["despesa", [Validators.required]],
      valor:[null, [Validators.required]],
      data:[null, [Validators.required]],
      pago:[true, [Validators.required]],
      categoriaId:[null, [Validators.required]]
    });
  }

  private loadLancamento(){
    if(this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.lancamentoService.getById(+params.get("id")))
      )
      .subscribe(
        (lancamento) =>{
          this.lancamento = lancamento
          this.lancamentoForm.patchValue(lancamento) //carregando dados para formulario
        },
        (error) => alert('Ocorreu um erro no servidor.')
      )
    }
  }

  private setPageTitle(){
    if (this.currentAction == 'new')  
      this.pageTitle = 'Cadastro de novo lancamento'
    else{
      const nomeLancamento = this.lancamento.nome || "";
      this.pageTitle = 'Editando lancamento: '+ nomeLancamento;
    }
  }

  private createLancamento(){
    const lancamento : Lancamento = Object.assign(new Lancamento(), this.lancamentoForm.value);

    this.lancamentoService.create(lancamento).subscribe(
      lancamento => this.actionsForSuccess(lancamento),
      error => this.actionsForError(error)
    )
  }

  private updateLancamento(){
    const lancamento : Lancamento = Object.assign(new Lancamento(), this.lancamentoForm.value);
    this.lancamentoService.update(lancamento).subscribe(
      lancamento => this.actionsForSuccess(lancamento),
      error => this.actionsForError(error)
    );
  }

  private actionsForSuccess(lancamento: Lancamento){
    toastr.success('Solicitação processada com sucesso!');

    //volta para lancamentos e re-abre o formulario na rota de edit
    this.router.navigateByUrl('lancamentos', {skipLocationChange: true}).then(
      () => this.router.navigate(['lancamentos', lancamento.id, 'edit'])
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

  private loadCategorias(){
    this.categoriaService.getall().subscribe(
      categorias => this.categorias = categorias
    )
  }
}
