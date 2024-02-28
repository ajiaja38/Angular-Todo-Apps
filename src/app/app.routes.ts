import { Routes } from '@angular/router';
import { LoginComponent } from './pages/common/login/login.component';
import { RegisterComponent } from './pages/common/register/register.component';
import { HomeComponent } from './pages/private/home/home.component';
import { authGuard } from './utils/guard/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { ArchiveComponent } from './pages/private/archive/archive.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Login Todo Apps',
    component: LoginComponent,
  },
  {
    path: 'register',
    title: 'Register Todo Apps',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
      },
      {
        path: 'archive',
        title: 'Arvhice',
        component: ArchiveComponent,
      },
    ],
  },
];
