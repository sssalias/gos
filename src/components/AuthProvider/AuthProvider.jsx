import React, {useEffect, useState} from 'react'
import {useKeycloak} from '@react-keycloak/web'
import {jwtDecode} from 'jwt-decode'

import classes from './AuthProvider.module.css'
import Logo from '../../components/UI/Logo/Logo';

const AuthProvider = ({children}) => {

    const {keycloak, initialized} = useKeycloak()

    const [hasRoot, setHasRoot] = useState(true)

    const [error, setError] = useState(false)


    useEffect(() => {
        if (initialized) {
            if (keycloak.token) {
                const roles = jwtDecode(keycloak.token).resource_access["kozodoy-client"].roles
                if (roles.includes('admin')) {
                    setHasRoot(true)
                } else {
                    setHasRoot(false)
                }
            } else {
                setError(true)
            }
        }
    }, [initialized])
    if (error) {
        return (
            <div className={classes.error__wrapper}>
                <Logo/>
                <h1>ИЗВИНИТЕ, ЧТО-ТО ПОШЛО НЕ ТАК...</h1>
            </div>
        )
    }
    if (!hasRoot) {
         return (
             <div className={classes.error__wrapper}>
                 <Logo/>
                 <h1>У ВАС НЕ ДОСТАТОЧНО ПРАВ!</h1>
             </div>
         )
    }
    if (hasRoot) {
        return (
            <>
                {children}
            </>
        )
    }
}

export default AuthProvider