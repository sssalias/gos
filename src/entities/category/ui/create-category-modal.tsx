import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import CreateCategoryForm from 'src/entities/category/ui/create-category-form'

type Props = {
    isOpen: boolean
    onOpen: () => void
    onOpenChange: () => void
}
const CreateCategoryModal: React.FC<Props> = props => {
    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h2>Создать категорию</h2>
                        </ModalHeader>
                        <ModalBody>
                            <CreateCategoryForm onClose={onClose}/>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export default CreateCategoryModal