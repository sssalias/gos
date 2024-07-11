import { useKeycloak } from '@react-keycloak/web'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useUserStore } from 'src/store/user'

import classes from './style.module.css'
import Logo from 'src/components/atoms/logo'
import { CircleLoader } from 'react-spinners'

type PropsType = {
    children: React.ReactNode
} 

const AuthProvider = ({children}: PropsType) => {

    const {setAuth} = useUserStore()
    const {keycloak, initialized} = useKeycloak()
    

    useEffect(() => {
        if (initialized && keycloak.token) {
            setAuth(keycloak.token)
        }
    }, [initialized, keycloak.token])
    
    function intervall(){
        keycloak.updateToken(5).then(function() {
            if(keycloak.token)
                    {
                        setAuth(keycloak.token)
                        
                    }
               }
            )
       }
             
    setInterval(intervall, 2000);

    
    const [hasRoot, setHasRoot] = useState(true)

    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (initialized) {
            if (keycloak.token) {
                // @ts-ignore
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

    
    return (
        <>
            {children}  
        </>
    )
}

export default AuthProvider