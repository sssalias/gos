import React from 'react';
import classes from "./CloseButton.module.css"
import close from "../../../assets/img/icons/close.svg";

const CloseButton = (props) => {
    return (
        <div onClick={props.event} className={classes.btn}>
            <img src={close} alt=""/>
        </div>
    );
};

export default CloseButton;