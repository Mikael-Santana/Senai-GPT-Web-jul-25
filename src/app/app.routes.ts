import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';
import { ChatScreen } from './user-module/Chat-screen/chat-screen';

export const routes: Routes = [
    {
        path:"login",
        loadComponent: () => LoginScreen
    },
    {
        path:"",
        loadComponent: () => LoginScreen
    }
];
