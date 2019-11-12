import { Component, OnInit } from '@angular/core';

import { BaseResourceModel } from "../../models/base-resource.model";
import { BaseResouceService } from "../../servicos/base-resource.service";

export abstract class BaseResouceListComponent<T extends BaseResourceModel> implements OnInit {

  resources : T[] = [];

  constructor(private resourceService: BaseResouceService<T> ) { }

  ngOnInit() {
    this.resourceService.getall().subscribe(
      resources => this.resources = resources.sort((a, b)=> b.id - a.id ),
      error => alert('Erro ao carregar a lista')
    )
  }

  deleteResource(resource : T){
    const confirmaDelete = confirm('Deseja realmente excluir este item?');

    if (confirmaDelete){
    this.resourceService.delete(resource.id).subscribe(
      ()=> this.resources = this.resources.filter(element => element != resource),
      ()=> alert('Erro ao tentar excluir')
    )
    }
  }

}
