import { User } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'


const Header: React.FC = () => {

    const {keycloak, initialized} = useKeycloak()
    const [data, setData] = useState({
        name: '',
        role: ''
    })

    useEffect(() => {
        if (keycloak.token && keycloak.token) {            
            //@ts-ignore
            if (keycloak.resourceAccess['kozodoy-client'].roles.includes('admin')) {
                setData({...data, role: 'Администатор'})
            //@ts-ignore
            } else if (keycloak.resourceAccess['kozodoy-client'].roles.includes('manager')) {
                setData({...data, role: 'Менеджер'})
            }
        }
    }, [initialized, keycloak])

    return (
        <header className='w-full flex'>
            <User
                name={data.name}
                description={data.role}
                className='ml-auto'
            />
        </header>
    )
}
export default Header