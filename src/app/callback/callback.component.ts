import { Component, OnInit } from '@angular/core';
import { RedirectRequestHandler } from '@openid/appauth';
import { AuthorizationService } from '../authorization.service';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(public authorizationService: AuthorizationService, public router: Router) { }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.location.hash || window.location.hash.length === 0) {
        const queryString = window.location.search.substring(1); // substring strips '?'
        const path = [window.location.pathname, queryString].join('#');
        window.location.assign(new URL(path, window.location.href).toString());
      } else {
        this.authorizationService.completeAuthorizationRequest().then((tokenResponse) => {
          console.log('recieved token response: ' + tokenResponse);
          this.router.navigate(['dashboard']);
        });
      }
    });
  }
}
