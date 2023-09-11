export interface SessionAuthConfig {
    redirectUrl: string;
    codeChallenge: string;
}

export interface TokenRequestConfig {
    grant_type: "authorization_code";
    code: string;
    scope: "openid read profile"
    client_id: "public";
    redirect_uri: string;
    code_verifier: string;
}

export interface TokenSession {
    accessToken: string;
    expiresIn: number;
    idToken: string;
    scope: string;
    tokenType: string;
}
