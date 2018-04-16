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

import { Requestor } from '@openid/appauth';

export class Html5Requestor extends Requestor {
    async xhr<T>(settings: JQueryAjaxSettings): Promise<T> {
        if (settings.method === 'POST') {
            const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

            if (settings.headers) {
                for (const key in settings.headers) {
                    if (settings.headers.hasOwnProperty(key)) {
                        const value = settings.headers[key];
                        headers.set(key, value as string);
                    }
                }
            }
            let data: string;
            if (typeof settings.data === 'string') {
                data = settings.data;
            } else {
                const params = new URLSearchParams();
                const dataParams = settings.data as any;
                for (const name in dataParams) {
                    if (dataParams.hasOwnProperty(name)) {
                        const value = dataParams[name];
                        params.append(name, value);
                    }
                }
                data = params.toString();
            }
            const response = await fetch(settings.url as string, {
                method: 'POST',
                headers: headers,
                body: data,
                mode: 'cors'
            });
            return await response.json() as T;
        } else {
            const response = await fetch(settings.url as string, {
                method: 'GET',
                headers: settings.headers,
                mode: 'cors'
            });
            return await response.json() as T;
        }
    }
}
