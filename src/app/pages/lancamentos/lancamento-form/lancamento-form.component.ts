import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from "@angular/forms";

import { Lancamento } from "../shared/lancamento.model";
import { LancamentoService } from "../shared/lancamento.service";

import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { BaseResourceFormComponent } from 'src/app/shared/componentes/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})
export class LancamentoFormComponent extends BaseResourceFormComponent<Lancamento> implements OnInit {

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
    protected lancamentoService: LancamentoService, 
    protected categoriaService: CategoriaService,
    protected injector: Injector
    ) { 
      super(injector, new Lancamento(), lancamentoService, Lancamento.fromJson)
    }

  ngOnInit() {
    this.loadCategorias();
    super.ngOnInit();
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

  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
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

  private loadCategorias(){
    this.categoriaService.getall().subscribe(
      categorias => this.categorias = categorias
    )
  }


  protected creationPageTitle(): string {
    return "Cadastro de Nova Lançamento";
  }

  protected editionPageTitle(): string {
    const nomeLancamento = this.resource.nome || "";
    return "Editando Lançamento: "+nomeLancamento;
  }
}
