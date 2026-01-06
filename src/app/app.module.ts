import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeIt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    ToastModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT' },
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    MessageService, // provideHttpClient ora ha interceptor dell'autenticazione e degli errori BE su ogni chiamata HTTP
    providePrimeNG({
      theme: {
        preset: {
          ...Aura,
          semantic: {
            ...Aura.semantic,
            primary: {
              50: '{blue.50}',
              100: '{blue.100}',
              200: '{blue.200}',
              300: '{blue.300}',
              400: '{blue.400}',
              500: '{blue.500}',
              600: '{blue.600}',
              700: '{blue.700}',
              800: '{blue.800}',
              900: '{blue.900}',
              950: '{blue.950}',
            },
          },
        },
        options: {
          darkModeSelector: false,
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
