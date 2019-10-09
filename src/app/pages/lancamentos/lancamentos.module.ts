import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { ListaLancamentoComponent } from './lista-lancamento/lista-lancamento.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';


@NgModule({
  imports: [
    CommonModule,
    LancamentosRoutingModule,
    ReactiveFormsModule
  ], 
  declarations: [ListaLancamentoComponent, LancamentoFormComponent]
})
export class LancamentosModule { }
