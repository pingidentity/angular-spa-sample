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
    AppAuthError,
    AuthorizationServiceConfigurationJson
} from '@openid/appauth';

import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
import { TokenResponseJson   } from '@openid/appauth';
import { UserInfo            } from './userinfo';
import { AuthorizationConfig } from './authorization_config';

const LS_ISSUER_URI     = 'authorization.service.issuer_uri';
const LS_USER_INFO      = 'authorization.service.user_info';
const LS_OPENID_CONFIG  = 'authorization.service.parsed_openid_configuration';
const LS_TOKEN_RESPONSE = 'authorization.service.token_response';
@Injectable()
export class AuthorizationService {

    private notifier = new AuthorizationNotifier();
    private authorizationHandler = new RedirectRequestHandler();

    private _tokenResponses: BehaviorSubject<TokenResponse | null>;
    private _userInfos:      BehaviorSubject<UserInfo | null>;
    private _serviceConfigs: BehaviorSubject<AuthorizationServiceConfiguration | null>;

    get issuerUri(): string {
        return this.environment.issuer_uri;
    }

    get expectedMetadataUri(): string {
        return `${this.issuerUri}/.well-known/openid-configuration`;
    }

    constructor(
        private requestor: Requestor,
        @Inject('AuthorizationConfig') private environment: AuthorizationConfig) {
        this.authorizationHandler.setAuthorizationNotifier(this.notifier);

        // attempt to restore previous values of the metadata config, token response, and user info
        let authorizationServiceConfiguration: AuthorizationServiceConfiguration | null = null;
        let tokenResponse: TokenResponse | null = null;
        let userInfo: UserInfo | null = null;
        const codeVerifier: string | null = null;

        // verify that we are still working with the same IDP, since a reload may
        // have been due to an underlying configuration change
        if (environment.issuer_uri === window.localStorage.getItem(LS_ISSUER_URI)) {
            const serviceConfigJSON = JSON.parse(
                window.localStorage.getItem(LS_OPENID_CONFIG)!);
            authorizationServiceConfiguration = serviceConfigJSON &&
        new AuthorizationServiceConfiguration(serviceConfigJSON);

            const tokenResponseJSON = JSON.parse(window.localStorage.getItem(LS_TOKEN_RESPONSE)!);
            tokenResponse = tokenResponseJSON && new TokenResponse(tokenResponseJSON);

            userInfo = JSON.parse(window.localStorage.getItem(LS_USER_INFO)!);
        } else {
            // new issuer (or first run, or cleared session)
            // make sure we store the issuer, and have no other state
            window.localStorage.setItem(LS_ISSUER_URI, environment.issuer_uri);
            window.localStorage.removeItem(LS_OPENID_CONFIG);
            window.localStorage.removeItem(LS_USER_INFO);
            window.localStorage.removeItem(LS_TOKEN_RESPONSE);
        }

        // create subjects with the current values (or null)
        this._tokenResponses = new BehaviorSubject(tokenResponse);
        this._serviceConfigs = new BehaviorSubject(authorizationServiceConfiguration);
        this._userInfos      = new BehaviorSubject(userInfo);

        // update local storage on changes
        this._serviceConfigs.subscribe((config: AuthorizationServiceConfiguration | null) => {
            if (config) {
                window.localStorage.setItem(LS_OPENID_CONFIG, JSON.stringify(config.toJson()));
            } else {
                window.localStorage.removeItem(LS_OPENID_CONFIG);
            }
        });
        this._tokenResponses.subscribe((token: TokenResponse | null) => {
            if (token) {
                window.localStorage.setItem(LS_TOKEN_RESPONSE, JSON.stringify(token?.toJson()));
            } else {
                window.localStorage.removeItem(LS_TOKEN_RESPONSE);
            }
        });
        this._userInfos.subscribe((info: UserInfo | null) => {
            if (info) {
                window.localStorage.setItem(LS_USER_INFO, JSON.stringify(info));
            } else {
                window.localStorage.removeItem(LS_USER_INFO);
            }
        });
        // monitor changes in metadata/tokens to possibly clear dependent values,
        // and to fetch userInfo.
        combineLatest([this._serviceConfigs, this._tokenResponses])
            .subscribe(
                ([configuration, token]: [AuthorizationServiceConfiguration | null, TokenResponse | null]) => {

                    // if the service config is cleared, we need to invalidate any TokenResponse/userInfo
                    if (configuration == null) {
                        if (token != null) {
                            this._tokenResponses.next(null);
                        }
                        this._userInfos.next(null);
                        return;
                    }

                    // if the token is cleared, assume userinfo is invalidated too
                    if (token == null) {
                        this._userInfos.next(null);
                        return;
                    }

                    // if we don't have a user info endpoint, we can't fetch user info
                    if (configuration.userInfoEndpoint == null) {
                        console.log('userinfo cannot be emitted - userinfo endpoint not specified by metadata');
                        this._userInfos.next(null);
                        return;
                    }

                    // fetch user info, if none
                    if (this._userInfos.value == null) {
                        const accessToken = token.accessToken;
                        this.requestor.xhr<UserInfo>({
                            url: configuration.userInfoEndpoint,
                            method: 'GET',
                            dataType: 'json',
                            headers: {'Authorization': `Bearer ${accessToken}`}
                        }).then((userinfo) => {
                            this._userInfos.next(userinfo);
                        });
                    }
                });

        // start fetching metadata
        if (authorizationServiceConfiguration == null) {
            this.fetchServiceConfiguration(environment);
        }
    }

    public serviceConfiguration(): Observable<AuthorizationServiceConfiguration | null> {
        return this._serviceConfigs.asObservable().pipe(distinctUntilChanged());
    }

    public tokenResponse(): Observable<TokenResponse | null> {
        return this._tokenResponses.asObservable().pipe(distinctUntilChanged());
    }

    public userInfos(): Observable<UserInfo | null> {
        return this._userInfos.asObservable().pipe(distinctUntilChanged());
    }

    public authorize(): void  {
        this._serviceConfigs
            .pipe(filter((value: any) => value != null))
            .pipe(take(1))
            .subscribe((configuration: AuthorizationServiceConfiguration) => {
                const scope = this.environment.scope || 'openid';

                // create a request
                const request = new AuthorizationRequest({
                    client_id: this.environment.client_id,
                    redirect_uri: this.environment.redirect_uri,
                    scope: scope,
                    response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
                    extras: this.environment.extras
                });
                this.authorizationHandler.performAuthorizationRequest(configuration, request);
            });
    }

    signOut(): void {
        console.log('signing out');
        this._tokenResponses.next(null);
    }

    completeAuthorizationRequest(): Promise<TokenResponse> {
        return new Promise((resolve, reject) => {
            this._serviceConfigs
                .pipe(filter((value: any) => value != null))
                .pipe(take(1))
                .subscribe((configuration: AuthorizationServiceConfiguration) => {
                    console.log('setting listener');
                    this.notifier.setAuthorizationListener((request, response, error) => {
                        console.log('Authorization request complete ', request, response, error);
                        if (response && response.code) {
                            const tokenHandler = new BaseTokenRequestHandler(this.requestor);

                            // use the code to make the token request.
                            const extras: StringMap = {};
                            if (this.environment.client_secret) {
                                extras['client_secret'] = this.environment.client_secret;
                            }
                            if (request.internal) {
                                extras['code_verifier'] = request.internal['code_verifier'];
                            }
                            const tokenRequest = new TokenRequest({
                                client_id: this.environment.client_id,
                                redirect_uri: this.environment.redirect_uri,
                                grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
                                code: response.code,
                                extras: extras
                            });

                            console.log('making token request:' + JSON.stringify(tokenRequest.toStringMap()));
                            tokenHandler.performTokenRequest(configuration, tokenRequest)
                                .then((tokenResponse) => {
                                    console.log('received token response ', tokenResponse);
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

    private async fetchServiceConfiguration(configuration: AuthorizationConfig) {
        const response = await AuthorizationServiceConfiguration.fetchFromIssuer(configuration.issuer_uri, this.requestor);
        this._serviceConfigs.next(response);
    }
}
