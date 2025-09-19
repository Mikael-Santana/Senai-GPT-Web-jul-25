import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface IChat {

  chatTitle: string;
  id: number;
  userId: string;

}

interface Imensage {

  chatId: number;
  id: number;
  text: string;
  userId: string;

}

@Component({
  selector: 'app-chat-screen',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat-screen.html',
  styleUrl: './chat-screen.css'
})
export class ChatScreen {

  chats: IChat[];
  chatSelecionado: IChat;
  mensagens: Imensage[];
  mensagemUsuario = new FormControl(""); // declaramos e atribuimos valor.

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { // Constrói a classe
    // Inicialização de variáveis...
    this.chats = [];
    this.chatSelecionado = null!;
    this.mensagens = [];
  }

  ngOnInit() { // Executado quando o Angular está pronto para rodar
    // Buscar dados da API.

    this.getChats();

  }

  async getChats() {
    // Método que busca os chats da API.



    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/chats", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("meuTokem")
      }
    }));

    if (response) {

      console.log("CHATS", response);
      this.chats = response as [];

    } else {

      console.log("Erro ao buscar os chats.");

    }

    this.cd.detectChanges(); // Força uma atualização na tela.

  }

  async onChatClick(chatClick: IChat) {

    console.log("ChatClick", chatClick)

    this.chatSelecionado = chatClick;

    // Logica para busca as mensagens:

    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/messages?chatId=" + chatClick.id, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("meuTokem")
      }
    }));

    console.log("MENSAGENS", response);

    this.mensagens = response as Imensage[];

    this.cd.detectChanges();


  }

  async enviarMensagem() {

    let novaMensagemUsuario = {

      //id
      chatId: this.chatSelecionado.id,
      userId: localStorage.getItem("meuId"),
      text: this.mensagemUsuario.value
    };

    let novaMensagemUsuarioResponse = await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", novaMensagemUsuario, {
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("meuTokem")
      }
    }));

    await this.onChatClick(this.chatSelecionado);

    //2 - Enviar a mensagem de usuario para a IA responder

    let respostaIAResponse = await firstValueFrom(this.http.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
      "contents": [
        {
          "parts": [
            {
              "text": this.mensagemUsuario.value + ".Me de uma resposta objetiva."
            }
          ]
        }
      ]
    },{
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": "AIzaSyDV2HECQZLpWJrqCKEbuq7TT5QPKKdLOdo"
      }
    })) as any

    let novaRespostaIA = {
      chatId: this.chatSelecionado.id ,
      userId: "chatbot",
      text: respostaIAResponse.candidates[0].content.parts[0].text
      //id
    }

      let novaRespostaAiResponse = await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", novaRespostaIA, {
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("meuTokem")
      }
    }));

    //atualiza as mensagens da tela
     await this.onChatClick(this.chatSelecionado);


  }
}

