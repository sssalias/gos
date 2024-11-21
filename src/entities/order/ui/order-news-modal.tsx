import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import OrderNewsCreateModal from 'src/entities/order/ui/order-news-create-modal'
import { OrderNewsList } from 'src/widgets/order-news-list'

type Props = {
    id: string
    isOpen: boolean
    onOpenChange: () => void    
}

const OrderNewsModal: React.FC<Props> = props => {

    const create = useDisclosure()

    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                <ModalHeader>Новости к заказу</ModalHeader>
                <ModalBody>
                    <OrderNewsList userId={props.id}/>
                    <OrderNewsCreateModal id={props.id} isOpen={create.isOpen} onOpenChange={create.onOpenChange}/>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={create.onOpen} color='primary' className='w-full'>
                        Создать новость
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default OrderNewsModal