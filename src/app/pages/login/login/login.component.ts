import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/servicos/auth.service';
import toastr from "toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
 
  ngOnInit() {
    this.authService.logout();
  }
 
  public login() {
    this.authService.loginForm(this.form.value).subscribe(response => {
        this.authService.setUser(response);
    }, error => {
      this.serverErrorMessages = [error.error_description];
      toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    });
  }

  private setupForm(){
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

 
}