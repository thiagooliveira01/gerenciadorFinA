import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'lancamentos',
    canActivate: [AuthGuard], 
    loadChildren: './pages/lancamentos/lancamentos.module#LancamentosModule' },

  { path: 'categorias', 
    canActivate: [AuthGuard], 
    loadChildren: './pages/categorias/categorias.module#CategoriasModule' },

  { path: 'consulta', 
    canActivate: [AuthGuard], 
    loadChildren: './pages/consulta/consulta.module#ConsultaModule' },

  { path: 'login',
    loadChildren: './pages/login/login.module#LoginModule' },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
