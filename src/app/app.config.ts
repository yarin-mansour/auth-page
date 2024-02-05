import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const LOCALSTORAGE_TOKEN_KEY = 'simple_login_and_register';

export function tokenGetter() {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
    importProvidersFrom([BrowserAnimationsModule]),
    importProvidersFrom(JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      allowedDomains: ['localhost:3000', 'localhost:8080']
    }
  }))]
};
