import { useEffect } from 'react'
import { useOrdersStore } from 'src/store/orders'
import { useUserStore } from 'src/store/user'
import OrdersService from '../services/OrdersService'

export const useOrdersPulling = () => {
    const {token} = useUserStore()
    const {setData} = useOrdersStore()

    useEffect(() => {
        const getData = async () => {
          
          const {data} = await OrdersService.get(token)
          setData(data)
        }

        if (token.length !== 0) {
          getData()
          setInterval(() => {
            getData()
          }, 5000)
        }
    }, [token])
}