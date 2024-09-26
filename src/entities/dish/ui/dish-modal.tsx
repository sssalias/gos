import { Modal, ModalContent, ModalHeader } from '@nextui-org/react'

type Props = {
    title: string
    isOpen:boolean
    onOpenChange: () => void
}

// Этот компонент вызывается в сущности Category!

const DishModal: React.FC<Props> = props => {
    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    <h2>Блюда {props.title}</h2>
                </ModalHeader>
            </ModalContent>
        </Modal>
    )
}
export default DishModal