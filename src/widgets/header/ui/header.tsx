import { User } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import AdaptiveMenu from 'src/widgets/adaptive-menu/ui/adaptive-menu'
import { getUserData } from 'src/widgets/header/api'


const Header: React.FC = () => {

    const {keycloak, initialized} = useKeycloak()
    const [data, setData] = useState<any>({
        user: '',
        role: ''
    })

    useEffect(() => {
        const info = getUserData(keycloak.token)
        setData(info)
    }, [keycloak.token])

    return (
        <header className='h-[100px] w-[calc(100%-275px-2rem)] max-sm:w-full max-sm:right-0 max-sm:px-5 flex items-center fixed  bg-white top-0 right-5 z-[15]'>
            <AdaptiveMenu/>
            <User
                name={data.user}
                description={data.role}
                className='ml-auto'
            />
        </header>
    )
}
export default Header