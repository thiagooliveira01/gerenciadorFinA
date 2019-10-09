import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//tirar quando for conectar com api
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDatabase } from "./in-memory-database";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase) //tirar quando for conectar com api
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
