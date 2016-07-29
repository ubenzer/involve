import { bootstrap } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { AppComponent, environment } from "./app/";
import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods} from "angularfire2";
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {appRouterProviders} from "./app/app.routes";
import {AuthGuardService} from "./app/auth-guard.service";
import {PostMessageService} from "./app/post-message.service";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  AuthGuardService,
  PostMessageService,
  appRouterProviders,
  ROUTER_DIRECTIVES,
  FIREBASE_PROVIDERS,
  // Initialize Firebase app
  defaultFirebase({
    apiKey: "AIzaSyDOsJNqRpeisDWY7EEfZuSJxloF0njOjdY",
    authDomain: "involve-development.firebaseapp.com",
    databaseURL: "https://involve-development.firebaseio.com",
    storageBucket: "",
  }),
  firebaseAuthConfig({
    provider: AuthProviders.Anonymous,
    method: AuthMethods.Anonymous
  }),
  disableDeprecatedForms(),
  provideForms()
]);
