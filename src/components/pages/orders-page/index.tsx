import { useEffect } from 'react'
import OrdersService from 'src/api/services/OrdersService'
import OrderTable from 'src/components/organisms/tables/orders-table'
import BaseTemplate from 'src/components/templates/base-template'
import { useOrdersStore } from 'src/store/orders'
import { useUserStore } from 'src/store/user'

const OrdersPage = () => {

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

    return (
      <BaseTemplate>
        <h1>Заказы</h1>
        <OrderTable/>
      </BaseTemplate>
    )
}

export default OrdersPage