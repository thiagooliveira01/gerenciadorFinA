import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Categoria } from "../../categorias/shared/categoria.model";
import { CategoriaService } from "../../categorias/shared/categoria.service";

import { Lancamento } from "../../lancamentos/shared/lancamento.model";
import { LancamentoService } from "../../lancamentos/shared/lancamento.service";

import currencyFormatter from "currency-formatter";


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  totalReceita: any = 0;
  totalDespesa: any = 0;
  saldo: any = 0;

  graficoReceita: any;
  graficoDespesa: any;

  chartOptions = {
    scales: {
      yAxes: [{
        ticks:{
          beginAtZero: true
        }}
      ]
    }
  }

  categorias: Categoria[] = [];
  lancamentos: Lancamento[] = [];

  @ViewChild('mes') mes: ElementRef = null;
  @ViewChild('ano') ano: ElementRef = null;

  constructor(private lancamentoService: LancamentoService, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.getall()
    .subscribe(categorias => this.categorias = categorias)
  }

  consultar(){
    const mes = this.mes.nativeElement.value;
    const ano = this.ano.nativeElement.value;

    if(!mes || !ano)
      alert('Selecione o Mês e o Ano para gerar os relatórios')
    else
      this.lancamentoService.getByMonthAndYear(mes, ano).subscribe(
        this.setValues.bind(this)
      )
  }

  private setValues(lancamentos: Lancamento[]){
    this.lancamentos = lancamentos;
    this.calcularSaldo();
    this.setDadosGrafico();
  }

  private calcularSaldo() {
    let totalReceita = 0;
    let totalDespesa = 0;

    this.lancamentos.forEach(lancamento =>{
      if(lancamento.tipo == 'receita')
        totalReceita += currencyFormatter.unformat(lancamento.valor, { code: 'BRL' })
      else
        totalDespesa += currencyFormatter.unformat(lancamento.valor, { code: 'BRL' })
    });

    this.totalReceita = currencyFormatter.format(totalReceita, {code: 'BRL'});
    this.totalDespesa = currencyFormatter.format(totalDespesa, {code: 'BRL'});
    this.saldo = currencyFormatter.format(totalReceita-totalDespesa, {code: 'BRL'});
  }

  private setDadosGrafico() {
    const dadosGrafico = [];

    this.categorias.forEach(categoria => {
      //filtrar lancamento por categoria e type
      const lancamentosFiltrados = this.lancamentos.filter(
        lancamento => (lancamento.categoria == categoria.id) && (lancamento.tipo == 'receita')
      );

      //
      if(lancamentosFiltrados.length > 0){
        const valorTotal = lancamentosFiltrados.reduce(
          (total, lancamento) => total + currencyFormatter.format(lancamento.valor, {code: 'BRL'}), 0
        )

        dadosGrafico.push({
          categoriaNome: categoria.nome,
          valorTotal: valorTotal
        })
      }
    });

    this.graficoReceita = {
      labels: dadosGrafico.map(item => item.categoriaNome),
      datasets: [{
        label: 'Gráfico de Receitas',
        backgroundColor: '#9CCC65', 
        data: dadosGrafico.map(item => item.valorTotal)
      }]
    }
  }
}
