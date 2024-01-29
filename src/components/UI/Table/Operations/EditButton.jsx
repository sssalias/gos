import React from 'react';
import edit from '../../../../assets/img/icons/operations/edit.svg'
import classes from './Opertions.module.css'
const DeleteButton = (props) => {
    return (
        <button className={classes.button}>
            <img src={edit} alt=""/>
        </button>
    );
};

export default DeleteButton;