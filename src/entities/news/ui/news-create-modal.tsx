import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useState } from 'react'
import { MediaService, NewsService } from 'src/shared/api'
import { useNewsStore } from 'src/store/news'

import { UseForm, SubmitHandler, useForm } from 'react-hook-form'
 
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type Props = {
    isOpen: boolean
    onOpenChange: any
}

type Inputs = {
    title: string
    body: string
    forUserTypes: string
}


const schema = yup
    .object({
        title: yup.string().required('Заголовок не должен быть пустым!'),
        body: yup.string().required('Содержание не должно быть пустым!'),
        forUserTypes: yup.string().required('Выберите категорию!')
    })
    .required()

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


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        // @ts-ignore
        resolver: yupResolver(schema)
    })

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

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                {(onClose => (
                    <>
                        <ModalHeader>
                            <h2>Создать новость</h2>
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                                <p className='text-red-400'>{errors.title?.message}</p>
                                <Input {...register('title')} type='text' label='Заголовок'/>
                                <p className='text-red-400'>{errors.body?.message}</p>
                                <Textarea {...register('body')} type='text' label='Содержание'/>
                                <p className='text-red-400'>{errors.forUserTypes?.message}</p>
                                <Select {...register('forUserTypes')} value={data.forUserTypes} label='Группа пользователей'>
                                    <SelectItem key='ВСЕ' value='ВСЕ'>ВСЕ</SelectItem>
                                    <SelectItem key='vip' value='vip'>vip</SelectItem>
                                    <SelectItem key='super_vip' value='super_vip'>super_vip</SelectItem>
                                </Select>
                                <Input type='file' label='Фотографии' multiple/>
                                <Button type='submit'  color='primary' variant='solid'>Создать</Button>
                            </form>
                        </ModalBody>
                    </>
                ))}
            </ModalContent>
        </Modal>
    )
}
export default NewsCreateModal