import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import CreateMenuForm from 'src/entities/menu/ui/create-menu-form'

type Props = {
    isOpen: boolean
    onOpenChange: () => void
}
const CreateMenuModal: React.FC<Props> = props => {
    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}> 
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h2>Создать меню</h2>
                        </ModalHeader>
                        <ModalBody>
                            <CreateMenuForm onClose={onClose}/>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export default CreateMenuModal