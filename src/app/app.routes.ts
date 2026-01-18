import { Routes } from '@angular/router';

// Componenti
import { LoginComponent } from './core/auth/pages/login/login.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

// Guards (I buttafuori)
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // -------------------------------------------------------------------------
  // 1. ROTTA LOGIN (Pubblica, senza Sidebar)
  // -------------------------------------------------------------------------
  {
    path: 'welcome',
    loadComponent: () =>
      import('./public/pages/landing/landing.component').then(
        (m) => m.LandingPageComponent,
      ),
    canActivate: [publicGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicGuard], // Se sei già loggato, ti manda alla Dashboard
  },

  // -------------------------------------------------------------------------
  // 2. AREA RISERVATA (Protetta, con Sidebar e Header)
  // -------------------------------------------------------------------------
  {
    path: '',
    component: MainLayoutComponent, // Il "guscio" con la sidebar
    canActivate: [authGuard], // Se NON sei loggato, ti manda al Login
    children: [
      // Redirect automatico alla Dashboard appena entri
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // Modulo Dashboard (Lazy Loading Standalone)
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES,
          ),
      },

      // Modulo Clienti / Anagrafiche (Lazy Loading Standalone)
      {
        path: 'customers',
        loadChildren: () =>
          import('./features/customers/customers.routes').then(
            (m) => m.CUSTOMERS_ROUTES,
          ),
      },

      // Modulo Ordini (Lazy Loading)
      {
        path: 'orders',
        loadChildren: () =>
          import('./features/orders/orders.module').then((m) => m.OrdersModule),
      },

      // Modulo Prodotti (Lazy Loading)
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.module').then(
            (m) => m.ProductsModule,
          ),
      },

      // Modulo Settings (Admin Only)
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.module').then(
            (m) => m.SettingsModule,
          ),
        canActivate: [adminGuard],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. WILDCARD (Cattura tutti gli indirizzi sbagliati)
  // -------------------------------------------------------------------------
  { path: '**', redirectTo: 'dashboard' },
];
