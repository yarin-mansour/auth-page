import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard/auth.guard';

  export const routes: Routes = [
    {
      path: 'home',
      canActivate: [AuthGuard],
      loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
      path: 'auth',
      loadChildren: () =>
          import('./auth/auth.routes')
              .then(m => m.AUTH_ROUTES)
    },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
  ];