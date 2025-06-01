import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { ComponentsShowcaseComponent } from './core/componets/components-showcase/components-showcase.component';

export const appRoutes: Route[] = [
  {
    path: 'header',
    loadChildren: () => import('header/Routes').then((m) => m?.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
  {
    path: 'library',
    component: ComponentsShowcaseComponent,
  },
];
