import { Injectable } from '@angular/core';
import {
  AuthorizationNotifier,
  AuthorizationRequest,
  AuthorizationServiceConfiguration,
  BaseTokenRequestHandler,
  RedirectRequestHandler,
  Requestor,
  StringMap,
  TokenRequest,
  TokenResponse,
  GRANT_TYPE_AUTHORIZATION_CODE
} from '@openid/appauth';
import { Html5Requestor } from './html5_requestor';
import { environment } from '../environments/environment';
import { TokenResponseJson } from '../../../AppAuth-JS/built/token_response';
import {UserInfo} from './userinfo';

@Injectable()
export class AuthorizationService {

  /* an example open id connect provider */
  openIdConnectUrl = environment.issuer;

  /* example client configuration */
  redirectUri = environment.redirect_uri;
  clientId = environment.client_id;
  scope = 'openid';

  requestor = new Html5Requestor();

  authenticated = false;
  tokenResponse: TokenResponse | null = null;

  currentUserName: string | null;
  userInfo: UserInfo | null;
  configuration: AuthorizationServiceConfiguration | null = null;
  notifier = new AuthorizationNotifier();
  authorizationHandler = new RedirectRequestHandler();

  constructor() {
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
  }

  authorize(): Promise<void>  {
    return this.fetchServiceConfiguration().then((configuration) => {
      const extras: StringMap = {
        'prompt': 'consent',
        'access_type': 'offline'
      };

            // create a request
      const request = new AuthorizationRequest(
        this.clientId, this.redirectUri, this.scope, AuthorizationRequest.RESPONSE_TYPE_CODE,
        undefined /* state */, extras);

      console.log('Making authorization request ', this.configuration, request);

      this.authorizationHandler.performAuthorizationRequest(
        this.configuration!, request);
      });
  }

  fetchServiceConfiguration(): Promise<AuthorizationServiceConfiguration> {
    return AuthorizationServiceConfiguration
      .fetchFromIssuer(this.openIdConnectUrl, this.requestor)
      .then(response => {
        console.log('Fetched service configuration', response);
        this.configuration = response;
        return response;
      });
  }

  signOut(): void {
    this.currentUserName = null;
    this.authenticated = false;
  }

  completeAuthorizationRequest(): Promise<TokenResponse> {
    return new Promise((resolve, reject) => {
      this.fetchServiceConfiguration().then((configuration) => {
        console.log('setting listener');
        this.notifier.setAuthorizationListener((request, response, error) => {
          console.log('Authorization request complete ', request, response, error);
          if (response && response.code) {
            const tokenHandler = new BaseTokenRequestHandler(new Html5Requestor());

            // use the code to make the token request.
            const tokenRequest = new TokenRequest(
                this.clientId, this.redirectUri, GRANT_TYPE_AUTHORIZATION_CODE, response.code, undefined);

            console.log('making token request');
            tokenHandler.performTokenRequest(configuration, tokenRequest)
              .then((tokenResponse) => {
                console.log('received token response ', tokenResponse);
                localStorage.setItem('issuerResponse', JSON.stringify(tokenResponse.toJson()));
                resolve(tokenResponse);
              });
          } else {
            reject(error);
          }
        });
        this.authorizationHandler.completeAuthorizationRequestIfPossible();
      }, reject);
    });
  }
}
