import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUpComponent)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];