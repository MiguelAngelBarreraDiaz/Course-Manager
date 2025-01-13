import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CreateEnrollmentComponent } from './components/create-enrollment/create-enrollment.component';
import { AuthGuard } from './guards/auth.guard';
import { UpdateEnrollmentComponent } from './components/update-enrollment/update-enrollment.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'create-course', component: CreateCourseComponent, canActivate: [AuthGuard] },
  { path: 'create-enrollment/:id', component: CreateEnrollmentComponent, canActivate: [AuthGuard] },
  { path: 'update-enrollment', component : UpdateEnrollmentComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];