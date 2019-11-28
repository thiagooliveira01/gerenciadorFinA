import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicos/auth.service';
import toastr from "toastr";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  model: any = {};

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  cadastrar() {
    this.authService.cadastrarForm(this.model).subscribe(response => {
      toastr.success('Cadastro realizado com sucesso!');

      //Limpa token e volta para tela de login
      this.authService.logout();
    }, error => {
      //console.error(error);
      toastr.error(error);
    });
  }

}
