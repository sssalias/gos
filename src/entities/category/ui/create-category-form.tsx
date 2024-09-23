import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { FormErrorAlert } from 'src/shared/ui'
import { useCategoriesStore } from 'src/store/categories'
import { createCategory } from 'src/widgets/category-list/api/createCategory'
import * as yup from 'yup'

type Props = {
    onClose: () => void
}

type Inputs = {
    title: string
}

const schema = yup
    .object({
        title: yup.string().required('Введите название категории!')
    })
    .required()

const CreateCategoryForm: React.FC<Props> = props => {

    const {keycloak} = useKeycloak()
    const {updateData} = useCategoriesStore()

    const {id} = useParams()

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: yupResolver<Inputs>(schema)
    })

    const onSubmit:SubmitHandler<Inputs> = (data) => createCategory(keycloak.token, data.title, id, updateData, reset, props.onClose)  


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormErrorAlert msg={errors.title?.message}/>
            <Input {...register('title')} type='text' label='Название'/>
            <Button type='submit' color='primary'>Создать</Button>
        </form>
    )
}
export default CreateCategoryForm