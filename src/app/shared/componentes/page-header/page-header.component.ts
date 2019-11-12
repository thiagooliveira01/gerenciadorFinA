import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') tituloPagina: string;
  @Input('button-class') classeBotao: string;
  @Input('button-text') textoBotao: string;
  @Input('button-link') linkBotao: string;

  constructor() { }

  ngOnInit() {
  }

}
