import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";
import {AngularFireAuth} from "angularfire2";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivate {
  isLoggedIn: boolean = null; // null unknown yet

  constructor(private auth: AngularFireAuth) { }

  canActivate(): Observable<boolean> {
    this.auth
      .subscribe(auth => {
        if (auth) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
          this.auth.login();
        }
      });

    return this.auth
      .take(1)
      .filter(auth => {
        return auth ? true :  false;
      })
      .map(x => true);
  }
}
