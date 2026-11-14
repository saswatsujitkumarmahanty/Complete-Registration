import { Routes } from '@angular/router';
import { RegisterEmployee } from './pages/employee/register-employee/register-employee';
import { AddEmployee } from './pages/employee/add-employee/add-employee';
import { ViewEmployee } from './pages/employee/view-employee/view-employee';
import { UpdateEmployee } from './pages/employee/update-employee/update-employee';
import { Login } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
import { Account } from './pages/account/account';
import { SetPassword } from './pages/auth/set-password/set-password';
import { LoginPassword } from './pages/auth/login-password/login-password';
import { authGuard } from './guard/auth.guard';
import { adminGuard } from './guard/role.guard';
import { Salary } from './pages/employee/salary/salary';
import { unsavedChangesGuard } from './guard/unsavedchanges.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'login-password', component: LoginPassword },
  { path: 'set-password', component: SetPassword, canActivate: [authGuard] },
  { path: 'register-employee', component: RegisterEmployee, canActivate: [authGuard] },
  { path: 'view-employee/:id', component: ViewEmployee, canActivate: [authGuard] },
  { path: 'account', component: Account, canActivate: [authGuard] },

  // Admin-only — mirrors backend [Authorize(Roles = "Admin")] on EmployeeController writes

  { path: 'add-employee', component: AddEmployee, canActivate: [adminGuard], canDeactivate: [unsavedChangesGuard] },
  { path: 'update-employee/:id', component: UpdateEmployee, canActivate: [adminGuard], canDeactivate: [unsavedChangesGuard] },
  { path: 'salary/:id', component: Salary, canActivate: [authGuard] },
];

