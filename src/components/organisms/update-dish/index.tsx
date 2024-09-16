import ModalTemplate from 'src/components/templates/modal-template'
import classes from './style.module.css'
import { useEffect, useState } from 'react'
import MediaService from 'src/api/services/MediaService'
import DishServices from 'src/api/services/DishServices'
import { useUserStore } from 'src/store/user'
import { useDishesStore } from 'src/store/dishes'


type PropsType = {
    close: any
    active: boolean
    id: string
    old: any
}

const UpdateDish = ({close, active, id, old}:PropsType) => {

    const [data, setData] = useState<any>(
        {
            title: null,
            price: 0,
            calories: 0,
            proteins:0,
            fats: 0,
            carbohydrates: 0,
            cookingTime: 0,
            weight: null,
            photoId: null
        }
    )

    useEffect(() => {
        setData(
            {
                title: old?.title,
                price: old?.price,
                calories: old?.calories,
                proteins: old?.proteins,
                fats: old?.fats,
                carbohydrates: old?.carbohydrates,
                cookingTime: old?.cookingTime,
                weight: old?.weight,
                photoId: old?.photoId
            } 
        )
    }, [old])

    const [file, setFile] = useState<any>(null)

    const [error, setError] = useState('')

    const {token} = useUserStore()
    const {updateData} = useDishesStore()
    

    const update = async (formData:any) => {
        await DishServices.update(token, formData)
        updateData(token, id)
    }

    const handleClick = (e:any) => {
        e.preventDefault()
        if (data.title !== null && data.title !== '' && data.weight !== null  && data.cookingTime !== 0 && data.price !== 0)  {


            if (file) {
                MediaService.upload(token, {file})
                    .then(res => update({...data, photoId: res.data.id, id: old.id}))
            } else {
                update({...data, id: old.id})
            }

            setData(
                {
                    title: null,
                    price: 0,
                    calories: 0,
                    proteins:0,
                    fats: 0,
                    carbohydrates: 0,
                    cookingTime: 0,
                    weight: null,
                    photoId: null
                }
            )
            setFile(null)
            setError('')
            close()
        }
        else {
            if (data.title === null || data.title === '' ) {
                setError('Название блюда не указано!')
            }
            if (data.weight === null) {
                setError('Вес блюда не указан!')
            }
            if (data.cookingTime === 0) {
                setError('Время приготовления блюда не указано!')
            }
            if (data.price === 0) {
                setError('Цена блюда не указана!')
            }
        }
    }


    return (
        <ModalTemplate title='Обновить блюдо' active={active} close={close}>
            <div className={classes.error}>
                <span>{error}</span>    
            </div>
            <form className={classes.form}>
                <label>
                    <span>Название ⃰</span>
                    <input value={data?.title} onChange={e => setData({...data, title: e.target.value})} type="text" required name='title'
                       placeholder='Название ⃰'/>
                </label>
                <label>
                    <span>Цена (рубли.копейки) ⃰</span>
                    <input value={data?.price} min={1} onChange={e => setData({...data, price: +e.target.value})} type='number' step='any' required name='price'
                       placeholder='Цена (рубли.копейки) ⃰'/>
                </label>
                <label>
                    <span>Время приготовления (минуты) ⃰</span>
                    <input value={data?.cookingTime} min={1} onChange={e => setData({...data, cookingTime: +e.target.value})} step='any'  type="number" required
                        name='cookingTime' placeholder='Время приготовления (минуты) ⃰'/>
                </label>
                <label>
                    <span>Вес (граммы) ⃰</span>
                    <input value={data?.weight} onChange={e => setData({...data, weight: +e.target.value})} type="number" step='any' required
                        name='weight' placeholder='Вес (граммы) ⃰'/>
                </label>
                <label>
                    <span>Калории</span>
                    <input value={data?.calories} onChange={e => setData({...data, calories: +e.target.value})} type="number" name='calories'
                        placeholder='Калории'/>
                </label>
                <label>
                    <span>Белки</span>
                    <input value={data?.proteins} onChange={e => setData({...data, proteins: +e.target.value})} type="number" name='proteins'
                        placeholder='Белки'/>
                </label>
                <label>
                    <span>Жиры</span>
                    <input value={data?.fats} onChange={e => setData({...data, fats: +e.target.value})} type="number" name='fats'
                        placeholder='Жиры'/>
                </label>
                <label>
                    <span>Углеводы</span>
                    <input value={data?.carbohydrates} onChange={e => setData({...data, carbohydrates: +e.target.value})} type="number"
                        name='carbohydrates' placeholder='Углеводы'/>
                </label>
                <div>
                    <label>Добавить фото</label>
                    <input type="file" onChange={e => setFile(e.target.files?.item(0))}/>
                </div>
            </form>
            <button className={classes.send__btn} onClick={handleClick}>Добавить</button>
        </ModalTemplate>
    )
}

export default UpdateDish