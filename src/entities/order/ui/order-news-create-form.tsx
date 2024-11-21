import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Textarea } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormErrorAlert } from 'src/shared/ui'
import * as yup from 'yup'
import { createOrderNews } from 'src/entities/order/api/createOrderNews'
import { useKeycloak } from '@react-keycloak/web'
import { usePersonalNewsStore } from 'src/store/personal-news'

type Props = {
    id: string
    onclose: () => void
}

type Inputs = {
    title: string
    body: string
}

const schema = yup
    .object({
        title: yup.string().required('Заголовок не должен быть пустым!'),
        body: yup.string().required('Содержание не должно быть пустым!'),
    })
    .required()

const OrderNewsCreateForm: React.FC<Props> = props => {

    const {keycloak} = useKeycloak()

    const {updateData} = usePersonalNewsStore()

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        //@ts-ignore
        resolver: yupResolver<Inputs>(schema)
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => createOrderNews({...data, photoIds: [], userId: props.id}, keycloak.token, props.onclose, updateData, reset)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormErrorAlert msg={errors.title?.message}/>
            <Input {...register('title')} type='text' label='Заголовок'/>
            <FormErrorAlert msg={errors.body?.message}/>
            <Textarea {...register('body')} type='text' label='Содержание'/>
            <Button type='submit' color='primary'>Создать новость</Button>
        </form>
    )
}
export default OrderNewsCreateForm