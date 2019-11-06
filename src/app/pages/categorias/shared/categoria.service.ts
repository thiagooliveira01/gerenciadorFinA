import { Injectable, Injector } from '@angular/core';

import { Categoria } from "./categoria.model";
import { BaseResouceService } from 'src/app/shared/servicos/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseResouceService<Categoria> {
  
  constructor(protected injector: Injector) { 
    super('api/categorias', injector, Categoria.fromJson)
  }

}
