import { provideRouter, RouterConfig } from '@angular/router';
import {CommentsComponent} from "./comments/comments.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AuthGuardService} from "./auth-guard.service";

const routes: RouterConfig = [
  {
    path: 'content/:id',
    component: CommentsComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', component: NotFoundComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
