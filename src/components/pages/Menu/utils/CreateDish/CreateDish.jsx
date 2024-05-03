import React, {useState} from 'react';
import Modal from "../../../../UI/Modal/Modal";
import classes from './CreateDish.module.css'
import {makeRequest} from "../../../../../services";
import {useKeycloak} from "@react-keycloak/web";
import MediaService from "../../../../../services/MediaService";

const CreateDish = (props) => {

    const [data, setData] = useState(
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

    const [file, setFile] = useState(null)

    const {keycloak} = useKeycloak()

    const [error, setError] = useState('')


    const handleClick = (e) => {
        e.preventDefault()
        if (data.title !== null && data.title !== '' && data.weight !== null  && data.cookingTime !== 0 && data.price !== 0)  {


            if (file) {
                MediaService.uploadFile(keycloak.token, {file})
                    .then(res => props.create({...data, photoId: res.data.id}))
            } else {
                props.create(data)
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
        <Modal title='Добавить блюдо' close={() => {
            props.close()
            setError('')
        }} active={props.active}>
            <div className={classes.error}>
                <span>{error}</span>
            </div>
            <form className={classes.form}>
                <input onChange={e => setData({...data, title: e.target.value})} type="text" required name='title'
                       placeholder='Название ⃰'/>
                <input min={1} onChange={e => setData({...data, price: +e.target.value})} type='number' step='any' required name='price'
                       placeholder='Цена (рубли.копейки) ⃰'/>
                <input min={1} onChange={e => setData({...data, cookingTime: +e.target.value})} step='any'  type="number" required
                       name='cookingTime' placeholder='Время приготовления (минуты) ⃰'/>
                <input onChange={e => setData({...data, weight: +e.target.value})} type="number" step='any' required
                       name='weight' placeholder='Вес (граммы) ⃰'/>
                <input onChange={e => setData({...data, calories: +e.target.value})} type="number" name='calories'
                       placeholder='Калории'/>
                <input onChange={e => setData({...data, proteins: +e.target.value})} type="number" name='proteins'
                       placeholder='Белки'/>
                <input onChange={e => setData({...data, fats: +e.target.value})} type="number" name='fats'
                       placeholder='Жиры'/>
                <input onChange={e => setData({...data, carbohydrates: +e.target.value})} type="number"
                       name='carbohydrates' placeholder='Углеводы'/>
                <div>
                    <label>Добавить фото</label>
                    <input type="file" onChange={e => setFile(e.target.files.item(0))}/>
                </div>
                <div>

                </div>
            </form>
            <button className={classes.send__btn} onClick={handleClick}>Добавить</button>
        </Modal>
    );
};

export default CreateDish;