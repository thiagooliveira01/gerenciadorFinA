import { Component } from '@angular/core';

import { Lancamento } from "../shared/lancamento.model";
import { LancamentoService } from "../shared/lancamento.service";
import { BaseResouceListComponent } from 'src/app/shared/componentes/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-lista-lancamento',
  templateUrl: './lista-lancamento.component.html',
  styleUrls: ['./lista-lancamento.component.css']
})
export class ListaLancamentoComponent extends BaseResouceListComponent<Lancamento> {

  constructor(private lancamentoService: LancamentoService ) { 
    super(lancamentoService);
  }

}
