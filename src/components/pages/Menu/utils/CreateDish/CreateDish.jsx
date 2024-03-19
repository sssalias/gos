import React, {useState} from 'react';
import Modal from "../../../../UI/Modal/Modal";
import classes from './CreateDish.module.css'

const CreateDish = (props) => {

    const [data, setData] = useState(
        {
            title: null,
            price: null,
            calories: null,
            proteins: null,
            fats: null,
            carbohydrates: null,
            cookingTime: null,
            weight: null
        }
    )


    const handleClick = (e) => {
        e.preventDefault()
        if (data.title !== null && data.title !== '' ** data.weight !== 0 && data.cookingTime !== 0 && data.price !== 0)  {
            props.create(data)
            props.close()
        }
    }


    return (
        <Modal title='Добавить блюдо' close={props.close} active={props.active}>
            <form className={classes.form}>
                <input onChange={e => setData({...data, title: e.target.value})} type="text" required name='title' placeholder='Название ⃰'/>
                <input onChange={e => setData({...data, price: e.target.value})} type="number"  required name='price' placeholder='Цена ⃰'/>
                <input onChange={e => setData({...data, cookingTime: e.target.value})} type="number" required name='cookingTime' placeholder='Время приготовления ⃰'/>
                <input onChange={e => setData({...data, weight: e.target.value.toString()})} type="number" required name='weight' placeholder='Вес ⃰'/>
                <input onChange={e => setData({...data, calories: e.target.value})} type="number" name='calories' placeholder='Калории'/>
                <input onChange={e => setData({...data, proteins: e.target.value})} type="number" name='proteins' placeholder='Белки'/>
                <input onChange={e => setData({...data, fats: e.target.value})} type="number" name='fats' placeholder='Жиры'/>
                <input onChange={e => setData({...data, carbohydrates: e.target.value})} type="number" name='carbohydrates' placeholder='Углеводы'/>
                <button onClick={handleClick}>Добавить</button>
            </form>
        </Modal>
    );
};

export default CreateDish;