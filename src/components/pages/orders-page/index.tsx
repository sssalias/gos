import OrderTable from 'src/components/organisms/tables/orders-table'
import BaseTemplate from 'src/components/templates/base-template'

const OrdersPage = () => {
    return (
      <BaseTemplate>
        <h1>Заказы</h1>
        <OrderTable/>
      </BaseTemplate>
    )
}

export default OrdersPage