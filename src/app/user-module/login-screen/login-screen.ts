import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css'
})
export class LoginScreen {

  loginForm: FormGroup;

  emailErroMessage: string;

  passwordErroMessage: string;


  constructor(private fb: FormBuilder) {
    // quando a tela iniciar.

    //inicia o formulario:
    //cria o campo obrigatorio do email.
    //cria o campo obrigadorio da senha.

    this.loginForm = this.fb.group({

      email: ["", [Validators.required]],
      password: ["", [Validators.required]]

    });

    //inicia com uma string vazia 

    this.emailErroMessage = 'o campo de e-mail é obrigatorio';
    this.passwordErroMessage = 'o campo de senha é obrigatório';

    return;


  }


  async onLoginClick() {

    alert("Botao de login clicado.");

    console.log("email", this.loginForm.value.email);
    console.log("password", this.loginForm.value.password);

    if (this.loginForm.value.email == "") {
      alert("preencha o email.");
      return;
    }
    if (this.loginForm.value.password == "") {
      alert("preencha a senha.");
      return;
    }

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {
      method: "POST", // ENVIAR.
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      })


    })


    console.log("STATUS CODE", response.status);

    if (response.status >= 200 && response.status < 300) {
      console.log("✅ Deu bom!");
      alert("✅ Deu bom! Login realizado com sucesso.");
    } else {
      console.log("❌ Deu ruim! Status:", response.status);
      alert("❌ Deu ruim! Erro ao fazer login. Código: " + response.status);

    }

  }

}
