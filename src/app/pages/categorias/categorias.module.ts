import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaCategoriaComponent } from './lista-categoria/lista-categoria.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';


@NgModule({
  declarations: [ListaCategoriaComponent, CategoriaFormComponent],
  imports: [
    SharedModule,
    CategoriasRoutingModule
  ]
})
export class CategoriasModule { }
