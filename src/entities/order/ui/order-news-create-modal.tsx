import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import OrderNewsCreateForm from 'src/entities/order/ui/order-news-create-form'

type Props = {
    id: string
    isOpen: boolean
    onOpenChange: () => void
}
const OrderNewsCreateModal: React.FC<Props> = props => {
    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                {(onclose) => (
                    <>
                        <ModalHeader>Создать новость</ModalHeader>
                        <ModalBody>
                            <OrderNewsCreateForm id={props.id} onclose={onclose}/>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export default OrderNewsCreateModal