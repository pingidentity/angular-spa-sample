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

import * as $ from 'jquery';

import { BrowserModule           }  from '@angular/platform-browser';
import { NgModule                }  from '@angular/core';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';

import { MatButtonModule }          from '@angular/material/button';
import { MatCardModule }            from '@angular/material/card';
import { MatIconModule }            from '@angular/material/icon';
import { MatProgressBarModule }     from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule }         from '@angular/material/sidenav';
import { MatSnackBarModule }        from '@angular/material/snack-bar';
import { MatToolbarModule }         from '@angular/material/toolbar';
import { MatListModule }            from '@angular/material/list';

import { Requestor, FetchRequestor } from '@openid/appauth';

import { AppComponent            } from './app.component';
import { AppRoutingModule        } from './app-routing.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthorizationService    } from './authorization.service';
import { CallbackComponent       } from './callback/callback.component';
import { DashboardComponent      } from './dashboard/dashboard.component';
import { IntroComponent          } from './intro/intro.component';
import { MetadataComponent       } from './metadata/metadata.component';

import { environment             } from '../environments/environment';
import { AuthorizationConfig     } from './authorization_config';
import { IntroDisplayService } from './intro-display.service';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        CallbackComponent,
        DashboardComponent,
        IntroComponent,
        MetadataComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        AppRoutingModule
    ],
    providers: [
        AuthorizationService,
        IntroDisplayService,
        { provide: Requestor, useValue: new FetchRequestor()},
        { provide: 'AuthorizationConfig', useValue: environment}
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
