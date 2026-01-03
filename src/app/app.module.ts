import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { provideHttpClient } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FormsModule, CoreModule],
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
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
              950: '{blue.950}'
            }
          }
        },
        options: {
          darkModeSelector: false,
          cssLayer: {
            name: 'primeng',
            order: 'primeng, app-styles'
          }
        }
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
