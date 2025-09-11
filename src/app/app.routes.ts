import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';
import { ChatScreen } from './user-module/chat-screen/chat-screen';
import { authGuard } from './auth.guard';
import { NewUserScreen } from './user-module/new-user-screen/new-user-screen';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => LoginScreen,
    pathMatch: 'full' // ← aqui estava faltando a vírgula
  },
  {
    path: 'chat',
    loadComponent: () => ChatScreen,
    canActivate: [authGuard]
  },
  {
    path: 'new',
    loadComponent: () => NewUserScreen
  }
];
