import { useKeycloak } from '@react-keycloak/web'
import { useEffect } from 'react'
import { AppealsService } from 'src/shared/api'
import { useAppealsStore } from 'src/store/appeals'

export const useAppealPulling = () => {
    const {keycloak} = useKeycloak()
    const {setData} = useAppealsStore()

    useEffect(() => {
        const getData = async () => {
            if (keycloak.token) {
                const res = await AppealsService.get(keycloak.token)  
                setData(res.data)
            }
        }
        getData()
        setInterval(() => {
            getData()
        }, 5000)
      }, [keycloak.token, setData])

}