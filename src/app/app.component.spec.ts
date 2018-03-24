import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatCardModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { MetadataComponent } from './metadata/metadata.component';
import { CallbackComponent } from './callback/callback.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { APP_BASE_HREF } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatToolbarModule, MatSidenavModule, MatCardModule, MatIconModule, AppRoutingModule, NoopAnimationsModule],
      declarations: [ AppComponent, MetadataComponent, CallbackComponent, DashboardComponent],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();

  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
