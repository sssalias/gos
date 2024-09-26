import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import CreateDishForm from 'src/entities/dish/ui/create-dish-form'

type Props = {
    isOpen: boolean
    onOpenChange: () => void
}
const CreateDishModal: React.FC<Props> = props => {
    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h2>Добавить блюдо</h2>
                        </ModalHeader>
                        <ModalBody>
                            <CreateDishForm onClose={onClose}/>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export default CreateDishModal