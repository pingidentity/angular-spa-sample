import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { AuthorizationService } from '../authorization.service';
import { Requestor } from '@openid/appauth';
import { Html5Requestor } from '../html5_requestor';
import { environment } from '../../environments/environment';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationComponent ],
      imports: [ MatCardModule, MatIconModule ],
      providers: [
        AuthorizationService,
        { provide: Requestor, useValue: new Html5Requestor()},
        { provide: 'AuthorizationConfig', useValue: environment}
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
