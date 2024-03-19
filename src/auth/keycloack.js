import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://192.168.0.101:8080",
    realm: "kozodoy",
    clientId: "kozodoy-client"
});

export default keycloak;