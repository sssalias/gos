import React from 'react';
import Modal from "../../../../UI/Modal/Modal";
import classes from './CreateDish.module.css'

const CreateDish = (props) => {
    return (
        <Modal title='Добавить блюдо' close={props.close} active={props.active}>
            <div className={classes.form}>
                <input type="text" name='title' placeholder='Название'/>
                <input type="number" name='price' placeholder='Цена'/>
                <input type="number" name='calories' placeholder='Калории'/>
                <input type="number" name='proteins' placeholder='Белки'/>
                <input type="number" name='fats' placeholder='Жиры'/>
                <input type="number" name='carbohydrates' placeholder='Углеводы'/>
                <input type="time" name='cookingTime' placeholder='Время приготовления'/>
                <button onClick={props.close}>Добавить</button>
            </div>
        </Modal>
    );
};

export default CreateDish;