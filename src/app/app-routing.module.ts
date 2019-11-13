import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'lancamentos', loadChildren: './pages/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'categorias', loadChildren: './pages/categorias/categorias.module#CategoriasModule' },
  { path: 'consulta', loadChildren: './pages/consulta/consulta.module#ConsultaModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
