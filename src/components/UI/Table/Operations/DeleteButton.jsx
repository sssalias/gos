import React from 'react';
import del from '../../../../assets/img/icons/operations/delete.svg'
import classes from './Opertions.module.css'
const DeleteButton = (props) => {
    return (
        <button onClick={props.event} className={classes.button}>
            <img src={del} alt=""/>
        </button>
    );
};

export default DeleteButton;