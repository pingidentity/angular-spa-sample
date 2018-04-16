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
