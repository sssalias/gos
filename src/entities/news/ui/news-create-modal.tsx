import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import NewsCreateForm from 'src/entities/news/ui/news-create-form'

type Props = {
    isOpen: boolean
    onOpenChange: () => void
    onClose: () => void
}


const NewsCreateModal: React.FC<Props> = props => {
    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    <h2>Создать новость</h2>
                </ModalHeader>
                <ModalBody>
                    <NewsCreateForm onClose={props.onClose}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
export default NewsCreateModal