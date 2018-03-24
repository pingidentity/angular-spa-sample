import { Requestor } from '@openid/appauth';

export class Html5Requestor extends Requestor {
    xhr<T>(settings: JQueryAjaxSettings): Promise<T> {
        const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

        if (settings.headers) {
            for (const key in settings.headers) {
                if (settings.headers.hasOwnProperty(key)) {
                    const value = settings.headers[key];
                    headers.set(key, value as string);
                }
            }
        }

        if (settings.method === 'POST') {
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
            return fetch(settings.url as string, {
                'method': 'POST',
                'headers': headers,
                'body': data,
                'mode': 'cors'
            })
            .then(response => response.json())
            .then(json => json as T);
        } else {
            return fetch(settings.url as string, {
                'method': 'GET',
                'headers': headers,
                'mode': 'cors'
            })
            .then(response => response.json())
            .then(json => json as T);
        }
    }
}
