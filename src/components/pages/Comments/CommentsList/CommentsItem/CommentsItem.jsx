import React, {useState} from 'react';
import classes from './CommentsItem.module.css'
import CloseButton from "../../../../UI/CloseButton/CloseButton";
import Modal from "../../../../UI/Modal/Modal";
import DeleteModal from "../../../../UI/DeleteModal/DeleteModal";
const CommentsItem = (props) => {

    const [activeModal, setActiveModal] = useState(false)
    const [activeDeleteModal, setActiveDeleteModal] = useState(false)
    const [feedback, setFeedback] = useState('')

    const sendFeedback = () => {
        // const [id, body, number, ownerId, ownerEmail] = props.appealData
        // console.log({id, body, number, ownerId, ownerEmail, feedback})
        props.feedback(props.data.id, feedback)
        // console.log(props.feedback)
    }


    return (
        <div className={classes.container}>

            <DeleteModal active={activeDeleteModal} close={() => setActiveDeleteModal(false)} event={() => props.delete(props.data.id)}  title='обращение'>

            </DeleteModal>

            <Modal title={<div style={{display: "flex", justifyContent: "center", gap: 25}}><h4>Обращение №{props.data.commentId}</h4> <span> {props.data.email} </span>
                <select value='Обработано'>
                    <option value="Обработано">Обработано</option>
                    <option value="В процессе">В процессе</option>
                </select> </div>} close={() => setActiveModal(false)} active={activeModal}>
                <div className={classes.content}>
                    <p>{props.data.text}</p>
                    <h4>Ответ: {props.data.feedback}</h4>
                    <textarea onChange={(e) => setFeedback(e.target.value)} placeholder='Текст ответа' className={classes.feedback}></textarea>
                    <button className={classes.send} onClick={sendFeedback}>Отправить ответ</button>
                </div>
            </Modal>
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <div className={classes.title}>
                        <h3>Обращение</h3>
                        <h3 className={classes.number}>№{props.data.commentId}</h3>
                    </div>
                    <CloseButton event={() => setActiveDeleteModal(true)}/>
                </div>
                <button onClick={() => setActiveModal(true)} className={classes.more}>Подробнее</button>
            </div>
        </div>
    );
};

export default CommentsItem;