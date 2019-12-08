import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null{
    if( this.exibeMessageErro() )
      return this.geMessageErro();
    else
      return null;
  }

  private exibeMessageErro(): boolean{
    return this.formControl.invalid && this.formControl.touched
  }

  private geMessageErro(): string | null {
    if (this.formControl.errors.required)
      return "Dado obrigatório";
    else if(this.formControl.errors.email)
      return "Formato de e-mail inválido";
    else if (this.formControl.errors.mismatch)
      return "A confirmação de senha não está combinando";
    else if (this.formControl.errors.invalidPass)
     return "A senha deve conter no mínimo um caracter em maiúsculo[A-Z], um caracter em minúsculo[a-z], um número[0-9] e um caractere especial!";
    else if(this.formControl.errors.minlength){
      const tamahoRequerido = this.formControl.errors.minlength.requiredLength;
      return `Deve ter no mínimo ${tamahoRequerido} caracteres`;
    }
    else if(this.formControl.errors.maxlength){
      const tamahoRequerido = this.formControl.errors.maxlength.requiredLength;
      return `Deve ter no máximo ${tamahoRequerido} caracteres`;
    }
  }
}
