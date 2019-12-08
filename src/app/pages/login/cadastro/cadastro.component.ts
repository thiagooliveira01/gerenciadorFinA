import { Component } from '@angular/core';
import { AuthService } from  '../../../core/servicos/auth.service';
import toastr from "toastr";
import { User } from '../../../core/models/user';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent{

  public form: FormGroup;
  public submitted: boolean;
  
  public serverErrorMessages: string[] = null;
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { 
    this.setupForm();
    this.submitted = false;
  }


  public cadastrar() {
    this.authService.cadastrarForm(this.form.value as User).subscribe(response => {
      toastr.success('Cadastro realizado com sucesso!');

      //Limpa token e volta para tela de login
      this.authService.logout();
    }, error => {
      this.serverErrorMessages = error.ModelState.erro;
      toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    });
  }

  
  public validacaoExtra(form: FormGroup){
    //Confirmação
    if(form.get('Password').dirty && form.get('Password').value === form.get('ConfirmPassword').value)
      form.get('ConfirmPassword').setErrors(null)
    else
      form.get('ConfirmPassword').setErrors({'mismatch': true});
  
    //Requisitos minimos para senha
    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[a-z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
    if(!regex.exec(form.get('Password').value))
      form.get('Password').setErrors({'invalidPass': true});
  }

  private setupForm(){
    this.form = this.formBuilder.group({
      Email: [null, [Validators.required, Validators.email]],
      Password: [null, [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: [null, [Validators.required]]
    }, { validator: this.validacaoExtra })
  }

}
