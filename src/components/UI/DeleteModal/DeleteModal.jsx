import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import classes from "./DeleteModal.module.css";

const DeleteModal = (props) => {

    return (
        <Modal close={props.close} active={props.active} title={`Вы уверены, что хотите удалить ${props.title}?`}>
            <div className={classes.container}>
                <button onClick={props.event}>Да</button>
                <button onClick={props.close} style={{background: 'lightgrey', borderColor: 'lightgrey', color: 'black'}}>Отмена</button>
            </div>
        </Modal>
    );
};

export default DeleteModal;