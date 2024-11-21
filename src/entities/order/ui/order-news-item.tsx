import { Card, CardBody, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'

type Props = {
    title: string
    body: string
}
const OrderNewsItem: React.FC<Props> = props => {

    const {onOpen, isOpen, onOpenChange} = useDisclosure()

    return (
        <>
            <Card  className='w-full flex flex-col cursor-pointer'>
                <CardBody onClick={onOpen}>
                    <h2 className='text-xl font-semibold'>{props.title}</h2>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>Содержание новости</ModalHeader>
                    <ModalBody>
                        <h2 className='text-xl font-semibold'>{props.title}</h2>
                        <span>{props.body}</span>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default OrderNewsItem