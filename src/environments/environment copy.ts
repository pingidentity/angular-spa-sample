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

import { AuthorizationConfig, GeneralEnvironmentInfo } from '../app/authorization_config';

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
