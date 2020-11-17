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

import { CallbackComponent } from './callback.component';
import { AuthorizationService } from '../authorization.service';
import { AppRoutingModule } from '../app-routing.module';
import { MetadataComponent } from '../metadata/metadata.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IntroComponent } from '../intro/intro.component';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../../environments/environment';
import { Requestor, FetchRequestor } from '@openid/appauth';

describe('CallbackComponent', () => {
    let component: CallbackComponent;
    let fixture: ComponentFixture<CallbackComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ AppRoutingModule, MatCardModule, MatIconModule, MatProgressSpinnerModule ],
            declarations: [ CallbackComponent, MetadataComponent, DashboardComponent, IntroComponent, AuthenticationComponent ],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'},
                AuthorizationService,
                { provide: Requestor, useValue: new FetchRequestor()},
                { provide: 'AuthorizationConfig', useValue: environment}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CallbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
