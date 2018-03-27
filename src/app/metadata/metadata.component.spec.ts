import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataComponent } from './metadata.component';
import { MatCardModule } from '@angular/material';
import { AuthorizationService } from '../authorization.service';
import { Html5Requestor } from '../html5_requestor';
import { environment } from '../../environments/environment';
import { Requestor } from '@openid/appauth';

describe('MetadataComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [ MetadataComponent ],
      providers: [
        AuthorizationService,
        { provide: Requestor, useValue: new Html5Requestor()},
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
