import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DynamicFormCurdComponent } from './dynamic-form-curd/dynamic-form-curd.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dynamic-crud', component: DynamicFormCurdComponent },
];