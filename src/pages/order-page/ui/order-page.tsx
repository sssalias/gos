import { MainLayout } from 'src/layout'
import { OrderTable } from 'src/widgets/order-table'

const OrderPage: React.FC = () => {
    return (
        <MainLayout title='Заказы'>
            <OrderTable/>
        </MainLayout>
    )
}
export default OrderPage