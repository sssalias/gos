import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useState } from 'react'
import { MediaService, NewsService } from 'src/shared/api'
import { useNewsStore } from 'src/store/news'

type Props = {
    isOpen: boolean
    onOpenChange: any
}
const NewsCreateModal: React.FC<Props> = props => {

    const {keycloak} = useKeycloak()
    const {updateData} = useNewsStore()

    const [data, setData] = useState({
        title: '',
        body: '',
        forUserTypes: 'user'
    })
    const [files, setFiles] = useState<any>([])

    const clearData = () => {
        setData({
            title: '',
            body: '',
            forUserTypes: 'user'
        })
        setFiles([])
    }

    const send = async (close:any) => {
        const photoIds: any[] = []
        //@ts-ignore
        Promise.all([...files].map((el:any) => MediaService.upload(keycloak.token, {file: el})))
            .then(res => {
                res.forEach(el => {
                    photoIds.push(el.data.id)                    
                })
                 //@ts-ignore
                NewsService.createForGroup(keycloak.token, {...data, photoIds})
                    .then(() => {
                        close()
                        clearData()
                         //@ts-ignore
                        updateData(keycloak.token)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }


    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                {(onClose => (
                    <>
                        <ModalHeader>
                            <h2>Создать новость</h2>
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-4'>
                                <Input onChange={el => setData({...data, title: el.target.value})} type='text' label='Заголовок'/>
                                <Textarea onChange={el => setData({...data, body: el.target.value})} type='text' label='Содержание'/>
                                <Select value={data.forUserTypes} onChange={e => setData({...data, forUserTypes: e.target.value})} label='Группа пользователей'>
                                    <SelectItem key='ВСЕ' value='ВСЕ'>ВСЕ</SelectItem>
                                    <SelectItem key='vip' value='vip'>vip</SelectItem>
                                    <SelectItem key='super_vip' value='super_vip'>super_vip</SelectItem>
                                </Select>
                                <Input onChange={e => setFiles(e.target.files)} type='file' label='Фотографии' multiple/>
                                <Button onPress={() => send(onClose)} color='primary' variant='solid'>Создать</Button>
                            </form>
                        </ModalBody>
                    </>
                ))}
            </ModalContent>
        </Modal>
    )
}
export default NewsCreateModal