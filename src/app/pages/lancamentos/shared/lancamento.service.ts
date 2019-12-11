import { Injectable, Injector } from '@angular/core';

import { BaseResouceService } from 'src/app/shared/servicos/base-resource.service';
import { Lancamento } from "./lancamento.model";
import { CategoriaService } from '../../categorias/shared/categoria.service';

import { Observable } from "rxjs";
import { flatMap, catchError, map } from "rxjs/operators";

import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends BaseResouceService<Lancamento>{

  constructor(protected injector: Injector, private categoriaService: CategoriaService) {
    super('api/lancamentos', injector, Lancamento.fromJson)
  }

  getByMonthAndYear(mes:number, ano: number): Observable<Lancamento[]>{
    return this.getall().pipe(
      map(lancamentos => this.filtrarMesEAno(lancamentos, mes, ano))
    )
  }

  private filtrarMesEAno(lancamentos: Lancamento[], mes: number, ano: number){
    return lancamentos.filter(lancamento => {
      const lancamentoData = moment(lancamento.data, "DD/MM/YYYY");
      const mesIgual = lancamentoData.month() +1 == mes;
      const anoIgual = lancamentoData.year() == ano;

      if(mesIgual && anoIgual) return lancamento;
    })
  }
}
