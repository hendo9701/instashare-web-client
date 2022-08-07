import {Routes} from '@angular/router';
import {RegisterComponent} from "./app-project/components/register/register.component";
import {LoginComponent} from "./app-project/components/login/login.component";
import {FilesGridComponent} from "./app-project/components/files-grid/files-grid.component";
import {PageNotFoundComponent} from "./app-project/components/page-not-found/page-not-found.component";
import {AuthenticationGuard} from "./app-project/guards/authentication.guard";

export const rootRouterConfig: Routes = [
  // * Admin Pages
  // Each has `data: {isAdminPage: true}` to determine menu and user-switch control contents
  {
    path: 'projects/login',
    component: LoginComponent
  },
  {
    path: 'projects/register',
    component: RegisterComponent
  },
  {
    path: 'projects/files-grid',
    component: FilesGridComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  {
    path: '',
    redirectTo: '/projects/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/projects/not-found',
  }
];
