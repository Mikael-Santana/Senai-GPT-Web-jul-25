import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';
import { ChatScreen } from './user-module/chat-screen/chat-screen';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    {
        path:"login",
        loadComponent: () => LoginScreen
    },

    {
        path:"chat",
        loadComponent: () => ChatScreen,
        canActivate: [authGuard]
    }
];
