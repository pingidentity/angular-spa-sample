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

// NOTE these are the production values for the SPA as deployed on Heroku.
// You will need to create your own production configuration to deploy
// into your environment.
import { AuthorizationConfig, GeneralEnvironmentInfo } from '../app/authorization_config';

export const environment: AuthorizationConfig & GeneralEnvironmentInfo = {
  production: true,
  issuer_uri: 'https://accounts.google.com',
  client_id: '465844544800-b8b08t54u74voph6f4flt1f2320q78kb.apps.googleusercontent.com',
  // https://github.com/openid/AppAuth-JS/issues/46#issuecomment-366804189
  client_secret: 'cYgd9Kg_a8LtqzVPiyREwDAS',
  redirect_uri: 'https://angular-appauth.herokuapp.com/callback',
  extras: {
    'prompt': 'consent',
    'access_type': 'offline'
  }
};
