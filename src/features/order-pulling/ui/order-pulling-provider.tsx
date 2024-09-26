import { useOrderPulling } from 'src/features/order-pulling/api'

type Props = {
    children: React.ReactNode
}
const OrderPullingProvider: React.FC<Props> = props => {
    useOrderPulling()
    return props.children
}
export default OrderPullingProvider