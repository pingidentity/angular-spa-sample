import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackComponent } from './callback.component';
import { AuthorizationService } from '../authorization.service';
import { AppRoutingModule } from '../app-routing.module';
import { MetadataComponent } from '../metadata/metadata.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { IntroComponent } from '../intro/intro.component';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { APP_BASE_HREF } from '@angular/common';
import { Html5Requestor } from '../html5_requestor';
import { environment } from '../../environments/environment';
import { Requestor } from '@openid/appauth';
import '../rxjs-operators';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppRoutingModule, MatCardModule, MatIconModule ],
      declarations: [ CallbackComponent, MetadataComponent, DashboardComponent, IntroComponent, AuthenticationComponent ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        AuthorizationService,
        { provide: Requestor, useValue: new Html5Requestor()},
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
