import React, {useEffect, useMemo, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import MenuAllPage from "./components/pages/Menu/All/MenuAllPage";
import OrdersPage from "./components/pages/OrdersPage/OrdersPage";
import CommentsPage from "./components/pages/Comments/CommentsPage";

import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./keycloack";
const App = () => {

    keycloak.onTokenExpired = () => {
        console.log('a!')
        // console.log('token expired', keycloak.token);
        // keycloak.updateToken(30).success(() => {
        //     console.log('successfully get a new token', keycloak.token);
        // }).error(() => {
        //     console.log('error')
        // });
    }

    const paths = [
        {path: '/menu/all', element: <MenuAllPage/>},
        {path: '/orders', element: <OrdersPage/>},
        {path: '/comments', element: <CommentsPage/>}
    ]

    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <div>
                <a onClick={() => {
                    // console.log(token)
                    // keycloak.login()
                    // console.log(keycloak.authenticated)
                    console.log(keycloak.token)
                    console.log(keycloak.refreshToken)
                }}>afa</a>
                <Routes>
                    {paths.map(({path, element}) => <Route path={path} element={element} key={path}/>)}
                </Routes>
            </div>
        </ReactKeycloakProvider>
    );
};

export default App;