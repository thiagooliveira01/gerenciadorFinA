import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { ListaLancamentoComponent } from './lista-lancamento/lista-lancamento.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';

import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";


@NgModule({
  imports: [
    CommonModule,
    LancamentosRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ], 
  declarations: [ListaLancamentoComponent, LancamentoFormComponent]
})
export class LancamentosModule { }
