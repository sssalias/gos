import { useEffect, useState } from 'react'
import classes from './style.module.css'
import { useUserStore } from 'src/store/user'
import { jwtDecode } from 'jwt-decode'
import { useKeycloak } from '@react-keycloak/web'

const Header = () => {
    
    const {token} = useUserStore()
    const {keycloak} = useKeycloak()
    const [userData, setUserData] = useState([])
    const [roleData, setRoleData] = useState('')

    useEffect(() => {
        if (token.length !== 0 && keycloak) {
            //@ts-ignore
            const jwt = jwtDecode(token)
            //@ts-ignore
            setUserData([jwt.given_name, ' ', jwt.family_name])
            //@ts-ignore
            if (keycloak.resourceAccess['kozodoy-client'].roles.includes('admin')) {
                setRoleData('Администатор')
            //@ts-ignore
            } else if (keycloak.resourceAccess['kozodoy-client'].roles.includes('manager')) {
                setRoleData('Менеджер')
            }
        }
    }, [token])

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
    )
}

export default Header