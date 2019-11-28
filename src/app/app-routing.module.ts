import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/componentes/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CadastroComponent } from './core/componentes/cadastro/cadastro.component';


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

  {path: 'cadastro', component: CadastroComponent},
  
  { path: 'login', component: LoginComponent },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
