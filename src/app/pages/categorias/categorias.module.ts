import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';

@NgModule({
  declarations: [ListaCategoriaComponent, CategoriaFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoriasRoutingModule
  ]
})
export class CategoriasModule { }
