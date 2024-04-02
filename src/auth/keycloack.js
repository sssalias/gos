import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: `${process.env.REACT_APP_KK_HOST}`,
    realm: `${process.env.REACT_APP_REALM}`,
    clientId: `${process.env.REACT_APP_CLIENT_ID}`
});

export default keycloak;