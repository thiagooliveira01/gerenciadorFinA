import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Lancamento } from "./lancamento.model";
import { CategoriaService } from '../../categorias/shared/categoria.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private apiPath : string = "api/lancamentos";

  constructor(private http: HttpClient, private categoriaService: CategoriaService) { }

  getall(): Observable<Lancamento[]>{
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToLancamentos)
    )
  }

  getById(id:number):Observable<Lancamento>{
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToLancamento)
    )
  }

  create(lancamento: Lancamento): Observable<Lancamento> {

    //@@remover quando ativar API
    return this.categoriaService.getById(lancamento.categoriaId).pipe(
      flatMap(categoria => {
        lancamento.categoria = categoria;
        return this.http.post(this.apiPath, lancamento).pipe(
          catchError(this.handleError),
          map(this.jsonDataToLancamento)
        )
      })
    )

    //@@Voltar
    //return this.http.post(this.apiPath, lancamento).pipe(
    //  catchError(this.handleError),
    //  map(this.jsonDataToLancamento)
    //)
  }

  update(lancamento: Lancamento): Observable<Lancamento>{
    const url = `${this.apiPath}/${lancamento.id}`;

    //@@remover quando ativar API
    return this.categoriaService.getById(lancamento.categoriaId).pipe(
      flatMap(categoria =>{
        lancamento.categoria = categoria;
        return this.http.put(url, lancamento).pipe(
            catchError(this.handleError),
            map(()=>lancamento)
          )
      })
    )

    //@@Voltar
    //return this.http.put(url, lancamento).pipe(
    //  catchError(this.handleError),
    //  map(()=>lancamento)
    //)
  }

  delete(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

//Medotodos privados
  private jsonDataToLancamentos(jsonData: any[]):Lancamento[]{

    //console.log(jsonData[0] as Lancamento);
    //console.log( Object.assign(new Lancamento(), jsonData[0]));

    const lancamentos: Lancamento[] = [];
    jsonData.forEach(element=>{
      const lancamento = Object.assign(new Lancamento, element);
      lancamentos.push(lancamento);
    });
    return lancamentos;
  }

  private jsonDataToLancamento (jsonData: any): Lancamento{
    return Object.assign(new Lancamento, jsonData)
  }

  private handleError(error:any): Observable<any>{
    console.log("Erro na requisição ->", error);
    return throwError(error);
  }

  
}
