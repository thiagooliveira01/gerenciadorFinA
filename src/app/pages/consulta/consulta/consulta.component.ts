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

  corReceita: ['#00FA9A','#00FFFF', '#006400', '#00FF00', '#B0E0E6', '#F0FFF0', '#E6E6FA','#4B0082','#7B68EE','#8B008B','#008080'];
  corDespesa: ['#FF0000','#DC143C', '#800000', '#D2691E', '#F08080', '#DAA520', '#8B4513','#F4A460','#FFA500','#FFFF00','#FF69B4'];

  @ViewChild('mes', {static: false}) mes: ElementRef = null;
  @ViewChild('ano', {static: false}) ano: ElementRef = null;

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
      this.lancamentoService.getByMonthAndYear(mes, ano).subscribe( this.setValues.bind(this) );
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
    this.graficoReceita = this.getDadosGrafico('receita', 'Grafico de Receitas', '#9CCC65');
    this.graficoDespesa = this.getDadosGrafico('despesa', 'Grafico de Despesas', '#e03131');

    console.log(this.graficoReceita);
    console.log(this.graficoDespesa);
  }

  private getDadosGrafico(tipoLancamento: string, titulo: string, cor: string){
    
    const dadosGrafico = [];

    this.categorias.forEach(categoria => {
      //filtrar lancamento por categoria e type
      const lancamentosFiltrados = this.lancamentos.filter(
        lancamento => (lancamento.categoriaId == categoria.id) && (lancamento.tipo == tipoLancamento)
      );

      //
      if(lancamentosFiltrados.length > 0){
        const valorTotal = lancamentosFiltrados.reduce(
          (total, lancamento) => total + currencyFormatter.unformat(lancamento.valor, {code: 'BRL'}), 0
        )

        dadosGrafico.push({
          categoriaNome: categoria.nome,
          valorTotal: valorTotal
        })
      }
    });

    return {
      labels: dadosGrafico.map(item => item.categoriaNome),
      datasets: [{
        label: titulo,
        backgroundColor: cor, 
        data: dadosGrafico.map(item => item.valorTotal)
      }]
    }
  }
}
