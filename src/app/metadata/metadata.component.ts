import { Component, OnInit, Inject } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { AuthorizationServiceConfiguration } from '@openid/appauth';
import { AuthorizationConfig } from '../authorization_config';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {

  public issuer_uri: string;

  constructor(private authorizationService: AuthorizationService,
    @Inject('AuthorizationConfig') private environment: AuthorizationConfig
) {
  this.issuer_uri = environment.issuer_uri;
}

  public authorizationServiceConfiguration: AuthorizationServiceConfiguration | null;

  ngOnInit() {
    this.authorizationService.serviceConfiguration().subscribe( (config) => this.authorizationServiceConfiguration = config);
  }

}
