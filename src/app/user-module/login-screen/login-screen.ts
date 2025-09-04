import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css'
})
export class LoginScreen {

  loginForm:  FormGroup;

  constructor (private fb: FormBuilder) {
    // quando a tela iniciar.
    
    //inicia o formulario:
    //cria o campo obrigatorio do email.
    //cria o campo obrigadorio da senha.

    this.loginForm = this.fb.group ({

      email: ["",[Validators.required]],
      passaword: ["",[Validators.required]]

    });

  }

  onLoginClick() {

    alert ("Botao de login clicado.");

    console.log ("email", this.loginForm.value.email);
    console.log ("passaword",  this.loginForm.value.passaword);

  }

}
