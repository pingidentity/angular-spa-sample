import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { MetadataComponent } from './metadata/metadata.component';
import { CallbackComponent } from './callback/callback.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntroComponent } from './intro/intro.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationService } from './authorization.service';

@NgModule({
  declarations: [
    AppComponent,
    MetadataComponent,
    CallbackComponent,
    DashboardComponent,
    IntroComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
