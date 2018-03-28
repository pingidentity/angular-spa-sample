import { AuthorizationConfig, GeneralEnvironmentInfo } from '../app/authorization_config';

export const environment: AuthorizationConfig & GeneralEnvironmentInfo = {
  production: true,
  issuer_uri: 'https://accounts.google.com',
  client_id: '465844544800-b8b08t54u74voph6f4flt1f2320q78kb.apps.googleusercontent.com',
  client_secret: 'cYgd9Kg_a8LtqzVPiyREwDAS',
  redirect_uri: 'https://angular-appauth.herokuapp.com/callback',
  extras: {
    'prompt': 'consent',
    'access_type': 'offline'
  }
};
