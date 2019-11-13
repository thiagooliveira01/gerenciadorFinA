import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from "@angular/common/http";
import { RouterModule } from '@angular/router';

//tirar quando for conectar com api
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDatabase } from "../in-memory-database";
import { NavbarComponent } from './componentes/navbar/navbar.component';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase) //tirar quando for conectar com api
  ],
  exports:[
    //modulos compartilhados
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NavbarComponent
  ]
})
export class CoreModule { }
