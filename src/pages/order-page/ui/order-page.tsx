import { MainLayout } from 'src/layout'
import { OrderTable } from 'src/widgets/order-table'

const OrderPage: React.FC = () => {
    return (
        <MainLayout title='Заказы'>
            <div className='flex justify-between'>
                
            </div>
            <OrderTable/>
        </MainLayout>
    )
}
export default OrderPage