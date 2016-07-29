/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { CommentFormComponent } from './comment-form.component';

describe('Component: CommentForm', () => {
  beforeEach(() => {
    addProviders([CommentFormComponent]);
  });

  it('should create an instance', () => {
    inject([CommentFormComponent], (cf: CommentFormComponent) => {
      expect(cf).toBeTruthy();
    });
  });
});
