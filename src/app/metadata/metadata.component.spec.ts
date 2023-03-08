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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MetadataComponent } from './metadata.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { AuthorizationService } from '../authorization.service';
import { environment } from '../../environments/environment';
import { Requestor, FetchRequestor } from '@openid/appauth';

describe('MetadataComponent', () => {
    let component: MetadataComponent;
    let fixture: ComponentFixture<MetadataComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ MatCardModule ],
            declarations: [ MetadataComponent ],
            providers: [
                AuthorizationService,
                { provide: Requestor, useValue: new FetchRequestor()},
                { provide: 'AuthorizationConfig', useValue: environment}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MetadataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
