import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./sections/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./sections/tasks/tasks.component').then((m) => m.TasksComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
