import React from 'react';
import more from '../../../../assets/img/icons/operations/more.svg'
import classes from './Opertions.module.css'
const DeleteButton = (props) => {
    return (
        <button onClick={props.event} className={classes.button}>
            <img src={more} alt=""/>
        </button>
    );
};

export default DeleteButton;