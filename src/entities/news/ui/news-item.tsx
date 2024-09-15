import { Button, Card, CardBody, Image, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { MdDelete, MdInfo } from 'react-icons/md'
import { NewsService } from 'src/shared/api'
import { DeleteConfirm } from 'src/shared/ui'
import { useNewsStore } from 'src/store/news'

type Props = {
    id: string
    title: string
    body: string
    forUserTypes: string
    photoIds: string[]
}
const NewsItem: React.FC<Props> = props => {


    const {keycloak} = useKeycloak()
    const {updateData} = useNewsStore()

    const deleteActive = useDisclosure()
    const infoActive = useDisclosure()

    return (
        <>
            <Card className='p-2'>
                <CardBody>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-4'>
                                <h2>{props.title}</h2>
                                <span>Роль: {props.forUserTypes}</span>
                            </div>
                            <span>{props.body}</span>
                        </div>
                        <div className='flex gap-2'>
                            <Button onPress={infoActive.onOpen} isIconOnly variant='solid' color='primary' size='sm' className='text-base'>
                                <i><MdInfo/></i>
                            </Button>                        
                            <Button 
                                onPress={deleteActive.onOpen} 
                                isIconOnly variant='solid' color='danger' size='sm' className='text-base'>
                                <i><MdDelete/></i>
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <DeleteConfirm isOpen={deleteActive.isOpen} onOpenChange={deleteActive.onOpenChange} function={async () => {
                 if (keycloak.token) {
                    await NewsService.deleteForGroup(keycloak.token, props.id)
                    updateData(keycloak.token)
                }
            }} title='эту новость'/>
            <Modal isOpen={infoActive.isOpen} onOpenChange={infoActive.onOpenChange}>
                <ModalContent>
                    <ModalHeader>
                        <h2>Новость</h2>
                    </ModalHeader>
                    <ModalBody>
                        <h3 className='font-semibold text-2xl'>{props.title}</h3>
                        <span>{props.body}</span>
                        <div className='flex flex-grow gap-2'>
                            {props.photoIds.map(el => (
                                <Image src={el} alt='photo' />
                            ))}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default NewsItem