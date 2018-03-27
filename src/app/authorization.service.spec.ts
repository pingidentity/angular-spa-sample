import { TestBed, inject } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { Requestor } from '@openid/appauth';
import { Html5Requestor } from './html5_requestor';
import { environment } from '../environments/environment';

describe('AuthorizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorizationService,
        { provide: Requestor, useValue: new Html5Requestor()},
        { provide: 'AuthorizationConfig', useValue: environment}
     ]
    });
  });

  it('should be created', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));
});
