import jwt_decode from 'jwt-decode';
import Keycloak from "keycloak-verify/src";

const TOKEN_KEY = 'kozodoy__access_token';
const REFRESH_TOKEN_KEY = 'kozodoy_refresh_token';
const PUBLIC_KEY = '-----BEGIN CERTIFICATE-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkk8iitHE7MXLcGg8wLE3Z3Dpl9dU0We+W0SfffCmCF5i3gr0UYiTqWJP2dj/a9gSePHIiX4Tus4rbw3BkWCIyrE34XxFGipHdSE1eleCXFvX9eMKIx4kufKzTHv7Jv9fohGTmiH9LAQrBilqFGZEU/8fUKibanZDVa0ZDnEmYAJl1DHYy+rpVL90f+CxrNlL9NLp36KCS1U7ZKDqz25mStoCPBvtfpphKsJIGU9PkgE1uRPLYxHLBIIFcO5hXmkVeFEwczLFTgcvaw6OEyBbqJVQ3X19bmDJ53EhQ/7zsRMgmhSDAKmuRZOdYYbfx05fOY8VETPesgUZ5OaUO5HEkQIDAQAB-----END CERTIFICATE-----';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = token => localStorage.setItem(TOKEN_KEY, token);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
export const setRefreshToken = refreshToken => localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

const getDetailsFromToken = () => {
    return jwt_decode(getToken());
};

// export const getUserRoles = () => getDetailsFromToken()?.resource_access["kozodoy-app"]?.roles;
// export const hasRole = role => getUserRoles()?.includes(role);

export const verifyToken = () => (
    Keycloak(
        {publicKey: PUBLIC_KEY}
    ).verifyOffline(getToken())
);


export const axiosInstanceDefault = axios.create();