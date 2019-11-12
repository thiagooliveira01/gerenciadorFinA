import { Component } from '@angular/core';

import { Categoria } from "../shared/categoria.model";
import { CategoriaService } from "../shared/categoria.service";
import { BaseResouceListComponent } from 'src/app/shared/componentes/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent extends BaseResouceListComponent<Categoria> {

  constructor(private categoriaService: CategoriaService ) { 
    super(categoriaService)
  }

}
