import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './componentes/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './componentes/page-header/page-header.component';
import { FormFieldErrorComponent } from './componentes/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './componentes/server-error-messages/server-error-messages.component';


@NgModule({
  declarations: [BreadCrumbComponent, PageHeaderComponent, FormFieldErrorComponent, ServerErrorMessagesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    RouterModule,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent
  ]
})
export class SharedModule { }
