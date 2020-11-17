// Copyright 2018 Ping Identity
//
// Licensed under the MIT License (the "License"); you may not use this file
// except in compliance with the License.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { TestBed, inject } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { Requestor, FetchRequestor } from '@openid/appauth';
import { environment } from '../environments/environment';

describe('AuthorizationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthorizationService,
                { provide: Requestor, useValue: new FetchRequestor()},
                { provide: 'AuthorizationConfig', useValue: environment}
            ]
        });
    });

    it('should be created', inject([AuthorizationService], (service: AuthorizationService) => {
        expect(service).toBeTruthy();
    }));
});
