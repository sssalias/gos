import React, {useState} from 'react';
import classes from './Modal.module.css'
import CloseButton from "../CloseButton/CloseButton";
import classNames from "classnames";
const Modal = (props) => {
    return (
        props.active ?
        <div className={classes.modal__wrapper}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <h2>{props.title}</h2>
                    <CloseButton event={props.close}/>
                </div>
                <div className={classes.content}>
                    {props.children}
                </div>
            </div>
        </div>
        : null
    );
};

export default Modal;