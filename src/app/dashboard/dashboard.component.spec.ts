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

import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthorizationService } from '../authorization.service';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { IntroComponent } from '../intro/intro.component';
import { environment } from '../../environments/environment';
import { Requestor, FetchRequestor } from '@openid/appauth';
import { IntroDisplayService } from '../intro-display.service';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ DashboardComponent, AuthenticationComponent, IntroComponent ],
            imports: [MatCardModule, MatIconModule],
            providers: [
                AuthorizationService,
                IntroDisplayService,
                { provide: Requestor, useValue: new FetchRequestor()},
                { provide: 'AuthorizationConfig', useValue: environment}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
