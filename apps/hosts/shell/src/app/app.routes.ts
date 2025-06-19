import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { ComponentsShowcaseComponent } from './core/componets/components-showcase/components-showcase.component';
import { LayoutComponent } from './core/pages/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'footer',
    loadChildren: () =>
      import('footer/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'header',
    loadChildren: () =>
      import('header/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'NxWelcome',
    component: NxWelcomeComponent,
  },
  {
    path: 'library',
    component: ComponentsShowcaseComponent,
  },
];
