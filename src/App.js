import React  from 'react';
import {Route, Routes} from 'react-router-dom';
import MenuPage from "./components/pages/Menu/MenuPage";
import OrdersPage from "./components/pages/OrdersPage/OrdersPage";
import CommentsPage from "./components/pages/Comments/CommentsPage";

import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./auth/keycloack";
import ProtectedRoute from "./auth/ProtectedRoute";
import Menu2 from "./components/pages/menu2/Menu2";
const App = () => {

    const paths = [
        {path: '/menu/*', element: <MenuPage/>},
        {path: '/orders', element: <OrdersPage/>},
        {path: '/comments', element: <CommentsPage/>},
        {path: '/menu2', element: <Menu2/>}
    ]

    return (
        <ReactKeycloakProvider authClient={keycloak} initOptions={{onLoad: 'login-required'}}>
            <div>
                <a onClick={() => {
                    console.log(keycloak.token)
                    // console.log(keycloak.logout())
                }}>afa</a>
                <Routes>
                    {paths.map(({path, element}) => <Route path={path} element={element} key={path}/>)}
                </Routes>
            </div>
        </ReactKeycloakProvider>
    );
};

export default App;