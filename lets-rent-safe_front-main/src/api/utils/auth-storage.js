class AuthStorage {
    constructor() {
        this.ACCESS_TOKEN_KEY = 'access_token';
        this.REFRESH_TOKEN_KEY = 'refresh_token';
    }

    getAccessToken() {
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    setTokens(accessToken, refreshToken) {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    setAccessToken(token) {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    }

    clear() {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }

    isAuthenticated() {
        return !!this.getAccessToken();
    }
}

export const authStorage = new AuthStorage(); 