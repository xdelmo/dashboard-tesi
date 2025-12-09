import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component'; // Assicurati che l'import sia corretto
import { authGuard } from './core/guards/auth.guard'; // Importa la guard
import { publicGuard } from './core/guards/public.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Pagina di Login (Pubblica)
  { path: 'login', component: LoginComponent, canActivate: [publicGuard] },

  // Dashboard (Protetta da authGuard)
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
