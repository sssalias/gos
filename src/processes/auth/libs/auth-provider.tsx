import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'
import { LoadingPage } from 'src/pages/loading-page'

type Props = {
    children: React.ReactNode
}
const AuthProvider: React.FC<Props> = props => {

    const {keycloak, initialized} = useKeycloak()
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        console.log(keycloak.token)
        if (initialized && keycloak.token) {
            setLoading(false)
        }
    }, [initialized, keycloak.token])

    if (isLoading) {
        return <LoadingPage/>
    }
    return props.children
}
export default AuthProvider