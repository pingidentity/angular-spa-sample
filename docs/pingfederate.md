Usage with PingFederate
=====

This document is meant to walk a developer through usage of this demo application with PingFederate.

Configuration of Demo app
-----

This demo application needs the environment configuration in `src/environments/environment.ts` to be modified to reference the issuer from PingFederate, as well as a registered public client id. An example would be:

``` environment.local-pingfederate.ts
import { AuthorizationConfig, GeneralEnvironmentInfo } from '../app/authorization_config';

export const environment: AuthorizationConfig & GeneralEnvironmentInfo  = {
  production: false,
  issuer_uri: 'https://localhost:9031',
  client_id: 'appauth-angular-app.localdev',
  redirect_uri: 'http://localhost:4200/callback',
  extras: {
    'prompt': 'consent',
    'access_type': 'offline'
  }
};
```

Note that the web server contains no OAuth logic - all communication and configuration is within the Javascript application. The above configuration will cause the browser to attempt to fetch the server metadata (in this case, at `https://localhost:9031/.well-known/openid-configuration`). 

The browser *must* be able to communicate with this server for the above configuration to work - for example, the https://localhost:9031 certificate must be trusted by the browser so that full server metadata may be fetched. You may verify that server metadata is being loaded by going to the 'Server Metadata' section of the demo app.

Configuration of PingFederate
-----

PingFederate needs to be configured with [OAuth Capabilities](https://docs.pingidentity.com/bundle/pingfederate-101/page/ntw1564002990680.html) and [OpenID Connect](https://docs.pingidentity.com/bundle/pingfederate-101/page/dkd1564002996125.html) with [appropriate scopes](https://docs.pingidentity.com/bundle/pingfederate-101/page/gtr1564002990929.html). Attributes to be exposed via the OpenID Connect policy (via the UserInfo) endpoint will be displayed, but are otherwise optional.

The demo application needs to be configured as an OAuth Client in PingFederate in order to be enabled as an OpenID Connect RP. You will want to set:

1. `Client Authentication` should be set to `None`
2. Set a `Redirect URI` to the location of the demo application's callback endpoint. For instance, during local development this might be set to `http://localhost:4200/callback`
3. Select `Authorization Code` as the `Allowed Grant Type`. This example does not use the `Implicit` grant type.
4. Select `Require Proof Key for Code Exchange (PKCE)`

You can also change optional settings to affect behavior

1. The behavior of how the user is prompted for consent to share information with the demo application can be changed using the `Bypass Authorization Approval` and persistent grant options.
2. Change the `ID Token Signing Algorithm` to an elliptic curve option, such as `ECDSA using P256 Curve and SHA-256`. The Javascript code supports this algorithm, and it reduces CPU utilization and the size of the resulting ID token.
3. Enable `Pairwise identifiers`. This will give a unique user identifier to the relying party, rather than returning the subject identifier of the user. This prevents correlation of a user across multiple relying parties.
