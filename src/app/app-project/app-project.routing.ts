import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {RegisterComponent} from "./components/register/register.component";

export const ProjectRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'files-grid',
        data: {isAdminPage: true},
        loadChildren: () =>
          import('./components/files-grid/files-grid.module').then((m) => m.FilesGridModule)
      },
      {
        path: 'not-found',
        component: PageNotFoundComponent
      }],
  }
];
