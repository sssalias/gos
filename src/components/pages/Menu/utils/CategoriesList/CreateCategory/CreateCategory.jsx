import React, {useState} from 'react';
import classes from "./CreateCategory.module.css";
import Modal from "../../../../../UI/Modal/Modal";


const CreateCategory = (props) => {

    const [activeModal, setActiveModal] = useState(false)

    const [title, setTitle] = useState('')

    const create = () => {
        props.create(title)
        setActiveModal(false)
    }

    return (
        <div className={classes.container}>
            <Modal close={() => setActiveModal(false)} active={activeModal} title='Создать категорию'>
                <div className={classes.modal__container}>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Название категории'/>
                    <button onClick={create}>Создать</button>
                </div>
            </Modal>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <button onClick={() => setActiveModal(true) }>+</button>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;