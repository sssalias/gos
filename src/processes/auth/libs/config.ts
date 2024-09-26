import Keycloak from 'keycloak-js'


export const authClient = new Keycloak({
    url: `${import.meta.env.VITE_KK_HOST}`,
    realm: `${import.meta.env.VITE_REALM}`,
    clientId: `${import.meta.env.VITE_CLIENT_ID}`,
})
