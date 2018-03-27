import { Injectable, Inject } from '@angular/core';
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
  GRANT_TYPE_AUTHORIZATION_CODE,
  AppAuthError
} from '@openid/appauth';

import { TokenResponseJson } from '../../../AppAuth-JS/built/token_response';
import { UserInfo          } from './userinfo';
import { AuthorizationConfig } from './authorization_config';

@Injectable()
export class AuthorizationService {

  // issuerUri = environment.issuer;
  // redirectUri = environment.redirect_uri;
  // clientId = environment.client_id;
  // extras = environment.extras;

  authenticated = false;
  tokenResponse: TokenResponse | null = null;

  userInfo: UserInfo | null;
  configuration: AuthorizationServiceConfiguration | null = null;
  notifier = new AuthorizationNotifier();
  authorizationHandler = new RedirectRequestHandler();

  constructor(
    private requestor: Requestor,
    @Inject('AuthorizationConfig') private environment: AuthorizationConfig) {
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
  }

  async authorize(): Promise<void>  {
    const configuration = await this.fetchServiceConfiguration();
    const scope = this.environment.scope || 'openid';

    // create a request
    const request = new AuthorizationRequest(
      this.environment.client_id, this.environment.redirect_uri, scope, AuthorizationRequest.RESPONSE_TYPE_CODE,
      undefined /* state */, this.environment.extras);

    console.log('Making authorization request ', this.configuration, request);

    this.authorizationHandler.performAuthorizationRequest(this.configuration, request);
  }

  async fetchServiceConfiguration(force: boolean = false): Promise<AuthorizationServiceConfiguration> {
    // return the existing configuration first, if present and we aren't forcing a re-fetch
    if (!force && this.configuration != null) {
      return this.configuration;
    }

    const response = await AuthorizationServiceConfiguration.fetchFromIssuer(this.environment.issuer_uri, this.requestor);
    console.log('Fetched service configuration', response);
    this.configuration = response;
    return response;
  }

  signOut(): void {
    this.authenticated = false;
  }

  completeAuthorizationRequest(): Promise<TokenResponse> {
    return new Promise((resolve, reject) => {
      this.fetchServiceConfiguration().then((configuration) => {
        console.log('setting listener');
        this.notifier.setAuthorizationListener((request, response, error) => {
          console.log('Authorization request complete ', request, response, error);
          if (response && response.code) {
            const tokenHandler = new BaseTokenRequestHandler(this.requestor);

            // use the code to make the token request.
            const tokenRequest = new TokenRequest(
              this.environment.client_id, this.environment.redirect_uri, GRANT_TYPE_AUTHORIZATION_CODE, response.code, undefined);

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

  async fetchUserInfo(token: TokenResponse): Promise<UserInfo> {
    const configuration = await this.fetchServiceConfiguration();
    if (configuration.userInfoEndpoint == null) {
      throw new Error('userinfo not specified by metadata');
    }

    const accessToken = token.accessToken;
    return await this.requestor.xhr<UserInfo>({
      url: configuration.userInfoEndpoint,
      method: 'GET',
      dataType: 'json',
      headers: {'Authorization': `Bearer ${accessToken}`}
    });
  }
}
