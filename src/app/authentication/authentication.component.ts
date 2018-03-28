import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { UserInfo } from '../userinfo';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  public userInfo: UserInfo | null;
  public authorized: boolean;

  constructor(private authorizationService: AuthorizationService) {
    this.authorized = false;
   }

  ngOnInit() {
    this.authorizationService.userInfos().subscribe((userInfo) => this.userInfo = userInfo);
    this.authorizationService.tokenResponse().subscribe((tokenResponse) => this.authorized = tokenResponse != null);
  }
}
