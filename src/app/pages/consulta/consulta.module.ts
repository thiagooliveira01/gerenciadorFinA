import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { ConsultaComponent } from './consulta/consulta.component';

import { ChartModule } from "primeng/chart";


@NgModule({
  declarations: [ConsultaComponent],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    SharedModule,
    ChartModule
  ]
})
export class ConsultaModule { }
