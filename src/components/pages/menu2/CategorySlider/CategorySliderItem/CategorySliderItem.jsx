import React, {useState} from 'react';
import Modal from "../../../../UI/Modal/Modal";
import classes from './CategorySliderItem.module.css'

const CategorySliderItem = (props) => {

    const [activeModal, setActiveModal] = useState(false)

    return (
        <div className={classes.container}>
            <Modal title={props.title} close={() => setActiveModal(false)} active={activeModal}>

            </Modal>
            <h1 className={classes.title} onClick={() => setActiveModal(true)}>{props.title}</h1>
        </div>
    );
};

export default CategorySliderItem;