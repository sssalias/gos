import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://5.145.160.142:8180/",
    realm: "kozodoy",
    clientId: "kozodoy-client"
});

export default keycloak;