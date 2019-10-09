import { Component, OnInit } from '@angular/core';

import { Lancamento } from "../shared/lancamento.model";
import { LancamentoService } from "../shared/lancamento.service";

@Component({
  selector: 'app-lista-lancamento',
  templateUrl: './lista-lancamento.component.html',
  styleUrls: ['./lista-lancamento.component.css']
})
export class ListaLancamentoComponent implements OnInit {

  lancamentos : Lancamento[] = [];

  constructor(private lancamentoService: LancamentoService ) { }

  ngOnInit() {
    this.lancamentoService.getall().subscribe(
      lancamentos => this.lancamentos = lancamentos.sort((a, b)=> b.id - a.id ),
      error => alert('Erro ao carregar a lista')
    )
  }

  deleteLancamento(lancamento){
    const confirmaDelete = confirm('Deseja realmente excluir este item?');
    if (confirmaDelete){
    this.lancamentoService.delete(lancamento.id).subscribe(
      ()=> this.lancamentos = this.lancamentos.filter(element => element != lancamento),
      ()=> alert('Erro ao tentar excluir')
    )
    }
  }

}
