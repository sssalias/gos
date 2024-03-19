import React  from 'react';
import {Route, Routes} from 'react-router-dom';
import MenuPage from "./components/pages/Menu/MenuPage";
import OrdersPage from "./components/pages/OrdersPage/OrdersPage";
import CommentsPage from "./components/pages/Comments/CommentsPage";

import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./auth/keycloack";
import ProtectedRoute from "./auth/ProtectedRoute";
import Menu2 from "./components/pages/menu2/Menu2";
import Appeals from "./components/pages/appeals/Appeals";
import AuthProvider from './components/AuthProvider/AuthProvider';
const App = () => {

    const paths = [
        {path: '/*', element: <MenuPage/>, index: true},
        {path: '/orders', element: <OrdersPage/>, index: false},
        {path: '/comments', element: <CommentsPage/>, index: false},
        {path: '/menu2', element: <Menu2/>, index: false},
        {path: '/appeals', element: <Appeals/>, index: false}
    ]

    return (
        <ReactKeycloakProvider authClient={keycloak} initOptions={{onLoad: 'login-required'}}>
                <Routes>
                    {paths.map(({path, element, index}) => <Route index={index} path={path} element={element} key={path}/>)}
                </Routes>
        </ReactKeycloakProvider>
    );
};

export default App;