import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createMenu } from 'src/entities/menu/api'
import { FormErrorAlert } from 'src/shared/ui'
import { useMenuStore } from 'src/store/menu'
import * as yup from 'yup'



type Inputs = {
    type: string
}

const schema = yup
    .object({
        type: yup.string().required('Выберите тип меню!')
    })
    .required()

type Props = {
    onClose: () => void
}


const CreateMenuForm: React.FC<Props> = props => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        //@ts-ignore
        resolver: yupResolver<Inputs>(schema)
    })
    const {data, updateData} = useMenuStore()
    const {keycloak} = useKeycloak()
    const [types, setTypes] = useState<string[]>([])
    const baseTypes = ['today', 'tomorrow']

    useEffect(() => {
        data.forEach(el => {
            if (baseTypes.includes(el.type)) {
                setTypes([...baseTypes.filter(item => item !== el.type), ...types])
            }
        })
        if (data.length === 0) {
            setTypes(baseTypes)
        }
    }, [data])

    console.log(types);
    

    const onSubmit: SubmitHandler<Inputs> = async (formData) => createMenu(keycloak.token, formData, updateData, reset, props.onClose)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormErrorAlert msg={errors.type?.message}/>
            <Select {...register('type')} label='Тип меню'>
                {types.map(el => <SelectItem key={el}>{el === 'today' ? 'Сегодня' : 'Завтра'}</SelectItem>)}
            </Select>
            <Button type='submit' color='primary' variant='solid'>Создать</Button>
        </form>
    )
}
export default CreateMenuForm