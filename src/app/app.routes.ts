import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'offers',
    loadComponent: () => import('./features/dashboard/offers.component').then((m) => m.OffersComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/dashboard/about.component').then((m) => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/dashboard/contact.component').then((m) => m.ContactComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register.component').then((m) => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/user-dashboard.component').then((m) => m.UserDashboardComponent)
  },
  {
    path: 'appointments/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/appointment-detail.component').then((m) => m.AppointmentDetailComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadComponent: () =>
      import('./features/dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent)
  },
  { path: '**', redirectTo: '' }
];
