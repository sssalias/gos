import {useKeycloak} from "@react-keycloak/web";

const ProtectedRoute = ({children}) => {
    const {keycloak, initialized} = useKeycloak()

    const isLoggedIn = keycloak.authenticated

    if (initialized) {
        if (!isLoggedIn) {
            keycloak.login()
        }
    }

    return isLoggedIn ? children: children
};

export default ProtectedRoute;