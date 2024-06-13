import React, {useEffect, useState} from 'react'
import {useKeycloak} from '@react-keycloak/web'
import {jwtDecode} from 'jwt-decode'

import classes from './AuthProvider.module.css'
import Logo from '../../components/UI/Logo/Logo';
import {CircleLoader} from 'react-spinners';

const AuthProvider = ({children}) => {

    const {keycloak, initialized} = useKeycloak()

    const [hasRoot, setHasRoot] = useState(true)

    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (initialized) {
            if (keycloak.token) {
                const roles = jwtDecode(keycloak.token).resource_access["kozodoy-client"].roles
                if (roles.includes('admin') || roles.includes('manager')) {
                    setHasRoot(true)
                    setLoading(false)
                } else {
                    setHasRoot(false)
                    setLoading(false)
                }
            } else {
                setError(true)
                setLoading(false)
            }
        }
    }, [initialized])

    if (loading) {
        return (
            <div className={classes.error__wrapper}>
                <CircleLoader color={'white'}/>
            </div>
        )
    }

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
                 <h1>У ВАС НЕДОСТАТОЧНО ПРАВ!</h1>
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