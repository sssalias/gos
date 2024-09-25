import { useKeycloak } from '@react-keycloak/web'
import { useEffect } from 'react'
import OrdersService from 'src/shared/api/services/OrdersService'
import { useOrdersStore } from 'src/store/orders'

export const useOrderPulling = () => {
    const {keycloak} = useKeycloak()
    const {setData} = useOrdersStore()


    useEffect(() => {
        const getData = async () => {
            if (keycloak.token) {
                const res = await OrdersService.get(keycloak.token)
                setData(res.data)
            }
        }
        getData()
        setInterval(() => {
            getData()
        }, 5000)
    }, [keycloak.token, setData])
}