import {Routes} from '@angular/router';

export const rootRouterConfig: Routes = [
    // * Admin Pages
    // Each has `data: {isAdminPage: true}` to determine menu and user-switch control contents
    {
        path: 'projects',
        data: {isAdminPage: true},
        loadChildren: () =>
            import('./app-project/app-project.module').then((m) => m.AppProjectModule)
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
