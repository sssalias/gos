import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useNewsStore } from 'src/store/news'

import { SubmitHandler, useForm } from 'react-hook-form'
 
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { send } from 'src/entities/news/libs'
import { FormErrorAlert } from 'src/shared/ui'

type Props = {
    onClose: () => void
}

type Inputs = {
    title: string
    body: string
    forUserTypes: string
    photoIds: File[]
}

const schema = yup
    .object({
        title: yup.string().required('Заголовок не должен быть пустым!'),
        body: yup.string().required('Содержание не должно быть пустым!'),
        forUserTypes: yup.string().required('Выберите категорию!'),
        photoIds: yup.mixed()
    })
    .required()


const NewsCreateForm: React.FC<Props> = props => {

    
    const {keycloak} = useKeycloak()
    const {updateData} = useNewsStore()

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        //@ts-ignore
        resolver: yupResolver<Inputs>(schema)
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => send(data, keycloak.token, props.onClose, updateData, reset)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormErrorAlert msg={errors.title?.message}/>
            <Input {...register('title')} type='text' label='Заголовок'/>
            <FormErrorAlert msg={errors.body?.message}/>
            <Textarea {...register('body')} type='text' label='Содержание'/>
            <FormErrorAlert msg={errors.forUserTypes?.message}/>
            <Select {...register('forUserTypes')} label='Группа пользователей'>
                <SelectItem key='user' value='user'>ВСЕ</SelectItem>
                <SelectItem key='vip' value='vip'>vip</SelectItem>
                <SelectItem key='super_vip' value='super_vip'>super_vip</SelectItem>
            </Select>
            <Input {...register('photoIds')} type='file' label='Фотографии' multiple/>
            <Button type='submit'  color='primary' variant='solid'>Создать</Button>
        </form>
    )
}
export default NewsCreateForm