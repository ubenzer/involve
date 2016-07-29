/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { PostMessageService } from './post-message.service';

describe('Service: PostMessage', () => {
  beforeEach(() => {
    addProviders([PostMessageService]);
  });

  it('should ...',
    inject([PostMessageService],
      (service: PostMessageService) => {
        expect(service).toBeTruthy();
      }));
});
