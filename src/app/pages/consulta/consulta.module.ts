import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { ConsultaComponent } from './consulta/consulta.component';

import { ChartModule } from "primeng/chart";

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ConsultaComponent],
  imports: [
    ConsultaRoutingModule,
    SharedModule,
    ChartModule,
    FormsModule
  ]
})
export class ConsultaModule { }
