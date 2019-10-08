import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Lancamento } from "./lancamento.model";

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private apiPath : string = "api/lancamentos";

  constructor(private http: HttpClient) { }

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
    return this.http.post(this.apiPath, lancamento).pipe(
      catchError(this.handleError),
      map(this.jsonDataToLancamento)
    )
  }

  update(lancamento: Lancamento): Observable<Lancamento>{
    const url = `${this.apiPath}/${lancamento.id}`;
    return this.http.put(url, lancamento).pipe(
      catchError(this.handleError),
      map(()=>lancamento)
    )
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
    const lancamentos: Lancamento[] = [];
    jsonData.forEach(element=>lancamentos.push(element as Lancamento));
    return lancamentos;
  }

  private jsonDataToLancamento (jsonData: any): Lancamento{
    return jsonData as Lancamento
  }

  private handleError(error:any): Observable<any>{
    console.log("Erro na requisição ->", error);
    return throwError(error);
  }

  
}
