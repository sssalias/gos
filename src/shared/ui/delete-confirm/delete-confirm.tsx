import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

type Props = {
    function: any
    title: string
    isOpen: boolean
    onOpenChange: any
}
const DeleteConfirm: React.FC<Props> = props => {
    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Подтвердите действие</ModalHeader>
                        <ModalBody>Вы уверены, что хотите удалить {props.title}?</ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose} color='primary' variant='light'>Нет</Button>
                            <Button onPress={() => {                            
                                props.function()
                                onClose()
                            }} color='danger' variant='solid'>Да</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export default DeleteConfirm