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

export interface AuthorizationConfig {
    issuer_uri:     string;
    client_id:      string;
    client_secret?: string;
    redirect_uri:   string;
    scope?:         string;
    extras?:        any;
}

export interface GeneralEnvironmentInfo {
    production?: boolean;
}
