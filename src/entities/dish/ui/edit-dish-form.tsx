import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { editDish } from 'src/entities/dish/api'
import { FormErrorAlert } from 'src/shared/ui'
import { useDishesStore } from 'src/store/dishes'
import * as yup from 'yup'
 
type Props = {
    data: any
    onClose: () => void
}

type Inputs = {
    title: string
    price: string
    weight: string
    cookingTime: number
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
}

const schema = yup
    .object({
        title: yup.string().required('Это обязательное поле!'),
        price: yup.string().required('Это обязательное поле!'),
        weight: yup.string().required('Это обязательное поле!'),
        cookingTime: yup.string().required('Это обязательное поле!'),
        calories: yup.number().notRequired(),
        proteins: yup.number().notRequired(),
        fats: yup.number().notRequired(),
        carbohydrates: yup.number().notRequired()
    })
    .required()

const EditDishForm: React.FC<Props> = props => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        // @ts-ignore
        resolver: yupResolver<Inputs>(schema)
    })

    const {keycloak} = useKeycloak()
    const {categoryId} = useParams()
    const {updateData} = useDishesStore()

    const onSubmit: SubmitHandler<Inputs> = (data) => editDish(keycloak.token, {...data, id: props.data.id}, categoryId, updateData, props.onClose, reset)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <fieldset className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                    <FormErrorAlert msg={errors.title?.message}/>
                    <Input {...register('title')} defaultValue={props.data.title} type='text' label='Название'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <FormErrorAlert msg={errors.price?.message}/>
                    <Input {...register('price')} defaultValue={props.data.price} type='text' label='Цена'/>    
                </div>
                <div className='flex flex-col gap-2'>
                    <FormErrorAlert msg={errors.weight?.message}/>
                    <Input {...register('weight')} defaultValue={props.data.weight} type='string' label='Вес'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <FormErrorAlert msg={errors.cookingTime?.message}/>
                    <Input {...register('cookingTime')} defaultValue={props.data.cookingTime} type='number' label='Время приготовления'/>
                </div>
                <Input {...register('calories')} defaultValue={props.data.calories} required={false} type='number' label='Калории'/>
                <Input {...register('proteins')} defaultValue={props.data.proteins} required={false} type='number' label='Белки'/>
                <Input {...register('fats')} defaultValue={props.data.fats} required={false} type='number' label='Жиры'/>
                <Input {...register('carbohydrates')} defaultValue={props.data.carbohydrates} required={false} type='number' label='Углеводы'/>
            </fieldset>
            <fieldset className='w-full'>
                <Button className='w-full' type='submit' variant='solid' color='primary' >Редактировать</Button>
            </fieldset>           
        </form>
    )
}
export default EditDishForm