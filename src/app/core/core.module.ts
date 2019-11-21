import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './componentes/navbar/navbar.component';

import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule } from '@angular/forms';

//tirar quando for conectar com api
//import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
//import { InMemoryDatabase } from "../in-memory-database";

@NgModule({
  declarations: [NavbarComponent, LoginComponent],
  imports: [
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => { 
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ["localhost:63594"]
      }
    })
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase) //tirar quando for conectar com api
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
