import { useKeycloak } from '@react-keycloak/web'
import { useEffect } from 'react'

type Props = {
    children: React.ReactNode
}
const AuthProvider: React.FC<Props> = props => {

    const {keycloak, initialized} = useKeycloak()

    useEffect(() => {
        console.log(keycloak.token)
        
    }, [initialized])

    return (
        <>
            {props.children}
        </>
    )
}
export default AuthProvider