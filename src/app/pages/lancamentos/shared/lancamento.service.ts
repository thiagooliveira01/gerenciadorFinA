import { Injectable, Injector } from '@angular/core';

import { BaseResouceService } from 'src/app/shared/servicos/base-resource.service';
import { Lancamento } from "./lancamento.model";
import { CategoriaService } from '../../categorias/shared/categoria.service';

import { Observable } from "rxjs";
import { flatMap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends BaseResouceService<Lancamento>{

  constructor(protected injector: Injector, private categoriaService: CategoriaService) {
    super('api/lancamentos', injector, Lancamento.fromJson)
  }

  create(lancamento: Lancamento): Observable<Lancamento> {
    return this.setCategoriaEnviaServidor(lancamento, super.create.bind(this));
  }

  update(lancamento: Lancamento): Observable<Lancamento>{
    return this.setCategoriaEnviaServidor(lancamento, super.update.bind(this));
  }

  private setCategoriaEnviaServidor(lancamento: Lancamento, sendFn: any): Observable<Lancamento>{
    //@@remover quando ativar API
    return this.categoriaService.getById(lancamento.categoriaId).pipe(
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return sendFn(lancamento);
      }),
      catchError(this.handleError)
    );

    //@@Voltar
    //return this.http.post(this.apiPath, lancamento).pipe(
    //  catchError(this.handleError),
    //  map(this.jsonDataToLancamento)
    //)
  }

//Medotodos privados
/*
  protected jsonDataToResources(jsonData: any[]):Lancamento[]{

    //console.log(jsonData[0] as Lancamento);
    //console.log( Object.assign(new Lancamento(), jsonData[0]));

    const lancamentos: Lancamento[] = [];
    jsonData.forEach(element=>{
      const lancamento = Lancamento.fromJson(element);
      lancamentos.push(lancamento);
    });
    return lancamentos;
  }

  protected jsonDataToResource (jsonData: any): Lancamento{
    return Lancamento.fromJson(jsonData);
  }

  Removido apos refactory Lancamento.fromJson

  */
}
