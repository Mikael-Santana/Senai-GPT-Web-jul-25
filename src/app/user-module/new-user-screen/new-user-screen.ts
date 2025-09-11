import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-screen.html',
  styleUrl: './new-user-screen.css'
})


export class NewUserScreen {
  newForm: FormGroup;

  // emailErrorMessage: string;
  // passwordErrorMessage: string;
  // sucessoErrorMessage: string;
  // incorretoErrorMessage: string;


  // private cd: ChangeDetectorRef
  // this.cd.ChangeDetectorRef(); / forca uma atualizacao na tela 

  constructor(private fb: FormBuilder) {
    //Quando a tela iniciar.

    //Inicia o formulario.
    //Cria o campo obrigatorio de email.
    //Cria o campo obrigatorio de password.
    this.newForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      name: ["", [Validators.required]],
      newpassword: ["", [Validators.required]]

    });

    // this.emailErrorMessage = "";
    // this.passwordErrorMessage = "";
    // this.sucessoErrorMessage = "";
    // this.incorretoErrorMessage = "";

  }

  async oncadastroClick() {
    // alert("Botao de login clicado.");

    // console.log("Email", this.loginForm.value.email);
    // console.log("Password", this.loginForm.value.password);

    // if (this.loginForm.value.email == "") {
    //   this.emailErrorMessage = "O campo de e-mail e obrigatorio.";
    //   this.passwordErrorMessage = "";
    //   return;
    // }

    // if (this.loginForm.value.password == "") {
    //   this.passwordErrorMessage = "O campo de senha e obrigatorio.";
    //   this.emailErrorMessage = "";
    //   return;
    // }
    
     const token = localStorage.getItem("meuTokem");
     console.log("cheguei", token)


    let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
      method: "POST", // Enviar
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`

      },
      body: JSON.stringify({
        email: this.newForm.value.email,
        name: this.newForm.value.name,
        password: this.newForm.value.password,
        newpassword: this.newForm.value.newpassword

      })
    });
    
    // console.log("STATUS CODE", response.status);

    // if (response.status >= 200 && response.status <= 299) {
    //   this.sucessoErrorMessage = "Login realizado com sucesso";
    //   this.incorretoErrorMessage = ""

    //   let json = await response.json();

    //   // console.log("json", json)

    //   let meuToken = json.accessToken;
    //   let meuId = json.user.id;

    //   localStorage.setItem("meuTokem", meuToken)
    //   localStorage.setItem("meuId", meuId)

    //   window.location.href = "chat";

    // }else {
    //   this.incorretoErrorMessage = "Login deu errado";
    //   this.sucessoErrorMessage = ""
    // }


  }
}
