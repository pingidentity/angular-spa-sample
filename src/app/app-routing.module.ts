import { NgModule           } from '@angular/core';
import { RouterModule       } from '@angular/router';
import { MetadataComponent  } from './metadata/metadata.component';
import { CallbackComponent  } from './callback/callback.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '',          redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'metadata',  component: MetadataComponent },
      { path: 'callback',  component: CallbackComponent },
      { path: 'dashboard', component: DashboardComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
