import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { ListaLancamentoComponent } from './lista-lancamento/lista-lancamento.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';

import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";


@NgModule({
  imports: [
    SharedModule,
    LancamentosRoutingModule,
    CalendarModule,
    IMaskModule
  ], 
  declarations: [ListaLancamentoComponent, LancamentoFormComponent]
})
export class LancamentosModule { }
