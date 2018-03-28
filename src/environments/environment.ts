import { AuthorizationConfig, GeneralEnvironmentInfo } from '../app/authorization_config';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: AuthorizationConfig & GeneralEnvironmentInfo  = {
  production: false,
  issuer_uri: 'https://accounts.google.com',
  client_id: '465844544800-f1k5bhu8jibs9vc1ifh7nmhpmh7nqnod.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:4200/callback',
  extras: {
    'prompt': 'consent',
    'access_type': 'offline'
  }
};
