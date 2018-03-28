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

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TokenResponseJson   } from '../../../AppAuth-JS/built/token_response';
import { UserInfo            } from './userinfo';
import { AuthorizationConfig } from './authorization_config';

@Injectable()
export class AuthorizationService {

  // issuerUri = environment.issuer;
  // redirectUri = environment.redirect_uri;
  // clientId = environment.client_id;
  // extras = environment.extras;
  private notifier = new AuthorizationNotifier();
  private authorizationHandler = new RedirectRequestHandler();

  private _tokenResponses: BehaviorSubject<TokenResponse>;
  private _userInfos: BehaviorSubject<UserInfo>;
  private _serviceConfigs: BehaviorSubject<AuthorizationServiceConfiguration>;

  constructor(
    private requestor: Requestor,
    @Inject('AuthorizationConfig') private environment: AuthorizationConfig) {
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
    this._tokenResponses = new BehaviorSubject(null);
    this._serviceConfigs = new BehaviorSubject(null);
    this._userInfos = new BehaviorSubject(null);
    this._tokenResponses.combineLatest(this._serviceConfigs)
    .subscribe(
      ([token, configuration]) => {
        // if we do not have a configuration, need to make sure the tokenResponse has been cleared
        console.log('running with token=' + (token && JSON.stringify(token.toJson())) +
        ', configuration=' + (configuration && JSON.stringify(configuration)));
        if (configuration == null) {
          if (token != null) {
            this._tokenResponses.next(null);
          }
        }
        // if we do not have both valid configuration and tokens, we don't have the ability to set a userinfo
        if (configuration == null || token == null) {
          this._userInfos.next(null);
          return;
        }

        if (configuration.userInfoEndpoint == null) {
          console.log('userinfo not emitted - userinfo endpoint not specified by metadata');
          this._userInfos.next(null);
        }

        const accessToken = token.accessToken;
        this.requestor.xhr<UserInfo>({
            url: configuration.userInfoEndpoint,
            method: 'GET',
            dataType: 'json',
            headers: {'Authorization': `Bearer ${accessToken}`}
          }).then((userinfo) => {
            this._userInfos.next(userinfo);
          });
    });
    this.fetchServiceConfiguration(environment);
    this._serviceConfigs.subscribe((config) => console.log('service config changed to' + config));
  }

  public serviceConfiguration(): Observable<AuthorizationServiceConfiguration> {
    return this._serviceConfigs.asObservable().distinctUntilChanged();
  }

  public tokenResponse(): Observable<TokenResponse> {
    return this._tokenResponses.asObservable().distinctUntilChanged();
  }

  public userInfos(): Observable<UserInfo> {
    return this._userInfos.asObservable().distinctUntilChanged();
  }

  authorize(): void  {
    this._serviceConfigs.filter((value) => value != null).take(1).subscribe((configuration) => {
      const scope = this.environment.scope || 'openid';

      // create a request
      const request = new AuthorizationRequest(
        this.environment.client_id, this.environment.redirect_uri, scope, AuthorizationRequest.RESPONSE_TYPE_CODE,
        undefined /* state */, this.environment.extras);

        console.log('Making authorization request ', configuration, request);
        this.authorizationHandler.performAuthorizationRequest(configuration, request);
    });
  }

  private async fetchServiceConfiguration(configuration: AuthorizationConfig) {
    const response = await AuthorizationServiceConfiguration.fetchFromIssuer(configuration.issuer_uri, this.requestor);
    this._serviceConfigs.next(response);
  }

  signOut(): void {
    console.log('signing out');
    this._tokenResponses.next(null);
  }

  completeAuthorizationRequest(): Promise<TokenResponse> {
    return new Promise((resolve, reject) => {
      this._serviceConfigs.filter((value) => value != null).take(1).subscribe((configuration) => {
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
                this._tokenResponses.next(tokenResponse);
                resolve(tokenResponse);
              });
          } else {
            reject(error);
          }
        });
        console.log('attempt to complete request');
        this.authorizationHandler.completeAuthorizationRequestIfPossible();
      }, reject);
    });
  }
}
