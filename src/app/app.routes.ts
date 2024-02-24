import { Routes } from '@angular/router';
import { LoginComponent } from './pages/common/login/login.component';
import { RegisterComponent } from './pages/common/register/register.component';
import { HomeComponent } from './pages/private/home/home.component';

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
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },
];
