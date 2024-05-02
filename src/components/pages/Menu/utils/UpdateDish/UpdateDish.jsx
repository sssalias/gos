import React, {useEffect, useState} from 'react';
import Modal from "../../../../UI/Modal/Modal";
import classes from './UpdateDish.module.css'
import {useKeycloak} from "@react-keycloak/web";
import MediaService from "../../../../../services/MediaService";

const UpdateDish = (props) => {

    const [data, setData] = useState(null)

    const [file, setFile] = useState(null)

    const {keycloak} = useKeycloak()

    const [error, setError] = useState('')

    useEffect(() => {
        setData(props.dish)
    }, [props.dish])

    const handleClick = (e) => {
        e.preventDefault()
        if (data.title !== null && data.title !== '' && data.weight !== null  && data.cookingTime !== 0 && data.price !== 0)  {


            if (file) {
                MediaService.uploadFile(keycloak.token, {file})
                    .then(res => props.update({...data, photoId: res.data.id}))
            } else {
                props.update(data)
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
            props.close()
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
        <Modal title='Обновить блюдо' close={() => {
            props.close()
            setError('')
        }} active={props.active}>
            <div className={classes.error}>
                <span>{error}</span>
            </div>
            <form className={classes.form}>
                <input value={data?.title} onChange={e => setData({...data, title: e.target.value})} type="text" required name='title'
                       placeholder='Название ⃰'/>
                <input value={data?.price} min={1} onChange={e => setData({...data, price: +e.target.value})} required name='price'
                       placeholder='Цена (рубли:копейки) ⃰'/>
                <input value={data?.cookingTime} min={1} onChange={e => setData({...data, cookingTime: +e.target.value})} type="number" required
                       name='cookingTime' placeholder='Время приготовления (минуты) ⃰'/>
                <input value={data?.weight} onChange={e => setData({...data, weight: e.target.value.toString()})} type="text" required
                       name='weight' placeholder='Вес (граммы) ⃰'/>
                <input value={data?.calories}  onChange={e => setData({...data, calories: e.target.value})} type="number" name='calories'
                       placeholder='Калории'/>
                <input value={data?.proteins} onChange={e => setData({...data, proteins: e.target.value})} type="number" name='proteins'
                       placeholder='Белки'/>
                <input value={data?.fats} onChange={e => setData({...data, fats: e.target.value})} type="number" name='fats'
                       placeholder='Жиры'/>
                <input value={data?.carbohydrates} onChange={e => setData({...data, carbohydrates: e.target.value})} type="number"
                       name='carbohydrates' placeholder='Углеводы'/>
                <div>
                    {/*<div className={classes.photo}>*/}
                    {/*    <img src={MediaService.getFile(data?.photoId)} alt=""/>*/}
                    {/*</div>*/}
                    <label>Обновить фото</label>
                    <input type="file" onChange={e => setFile(e.target.files.item(0))}/>
                </div>
                <div>

                </div>
            </form>
            <button className={classes.send__btn} onClick={handleClick}>Добавить</button>
        </Modal>
    );
};

export default UpdateDish;