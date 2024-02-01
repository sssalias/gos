import React, {useState} from 'react';
import classes from './CommentsItem.module.css'
import CloseButton from "../../../../UI/CloseButton/CloseButton";
import Modal from "../../../../UI/Modal/Modal";
const CommentsItem = (props) => {

    const [activeModal, setActiveModal] = useState(false)

    return (
        <div className={classes.container}>
            <Modal title={`Обращение №${props.data.commentId}`} close={() => setActiveModal(false)} active={activeModal}>
                <div className={classes.content}>
                    <p>{props.data.text}</p>
                </div>
            </Modal>
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <div className={classes.title}>
                        <h3>Обращение</h3>
                        <h3 className={classes.number}>№{props.data.commentId}</h3>
                    </div>
                    <CloseButton event={() => props.delete(props.data.id)}/>
                </div>
                <button onClick={() => setActiveModal(true)} className={classes.more}>Подробнее</button>
            </div>
        </div>
    );
};

export default CommentsItem;