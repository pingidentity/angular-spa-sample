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

import { BrowserModule           } from '@angular/platform-browser';
import { NgModule                } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { Requestor               } from '@openid/appauth';

import { AppComponent            } from './app.component';
import { AppRoutingModule        } from './app-routing.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthorizationService    } from './authorization.service';
import { CallbackComponent       } from './callback/callback.component';
import { DashboardComponent      } from './dashboard/dashboard.component';
import { IntroComponent          } from './intro/intro.component';
import { MetadataComponent       } from './metadata/metadata.component';

import { Html5Requestor          } from './html5_requestor';
import { environment             } from '../environments/environment';
import { AuthorizationConfig     } from './authorization_config';
import './rxjs-operators';

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
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [
    AuthorizationService,
    { provide: Requestor, useValue: new Html5Requestor()},
    { provide: 'AuthorizationConfig', useValue: environment}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
