/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { CommentSingleComponent } from './comment-single.component';
import {FirebaseAuth} from "angularfire2";

beforeEach(() => {
  addProviders([FirebaseAuth]);
});

describe('Component: CommentForm', () => {
  it('should create an instance', () => {
    inject([FirebaseAuth], (fba: FirebaseAuth) => {
      expect(fba).toBeTruthy();
      let component = new CommentSingleComponent(fba);
      expect(component).toBeTruthy();
    });
  });
});
