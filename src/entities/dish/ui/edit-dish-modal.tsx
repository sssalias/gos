import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import EditDishForm from 'src/entities/dish/ui/edit-dish-form'

type Props = {
    isOpen: boolean
    onOpenChange: () => void
    title: string
    data: any
}

const EditDishModal: React.FC<Props> = props => {
    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h2>Редактировать блюдо {props.title}</h2>    
                        </ModalHeader>
                        <ModalBody>
                            <EditDishForm onClose={onClose} data={props.data}/>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export default EditDishModal