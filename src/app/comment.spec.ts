/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import {Comment} from './comment';

describe('Comment', () => {
  it('should create an instance', () => {
    expect(new Comment("", "", "", true, new Date(), "")).toBeTruthy();
  });
});
