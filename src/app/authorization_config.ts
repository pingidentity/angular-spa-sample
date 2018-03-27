export interface AuthorizationConfig {
    issuer_uri:     string;
    client_id:      string;
    client_secret?: string;
    redirect_uri:   string;
    scope?:         string;
    extras?:        any;
}
