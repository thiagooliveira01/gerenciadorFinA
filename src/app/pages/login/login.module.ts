import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';



@NgModule({
  declarations: [LoginComponent, CadastroComponent],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
