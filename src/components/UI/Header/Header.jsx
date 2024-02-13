import React, {useEffect, useState} from 'react';
import classes from './Header.module.css'
import {useKeycloak} from "@react-keycloak/web";
import {jwtDecode} from "jwt-decode";
const Header = () => {

    const {keycloak, initialized} = useKeycloak()
    const [userData, setUserData] = useState([])
    const [roleData, setRoleData] = useState('')

    useEffect(() => {
        if (initialized) {
            const jwt = jwtDecode(keycloak.token)
            setUserData([jwt.given_name, ' ', jwt.family_name])
            if (keycloak.resourceAccess['kozodoy-client'].roles.includes('admin')) {
                setRoleData('Администатор')
            }
        }
    }, [initialized]);



    return (
        <header>
            <div className={classes.container}>
                <div className={classes.wrapper}>

                    <div className={classes.user}>
                        <h4 className={classes.info}> {userData.map((el) => <>{el}</>)}</h4>
                        <h5 className={classes.role}>{roleData}</h5>
                        {/*<div className={classes.avatar}></div>*/}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;