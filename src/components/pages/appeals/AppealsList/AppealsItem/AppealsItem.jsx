import React, {useState} from 'react';
import classes from './AppealsItem.module.css'
import classNames from 'classnames'

import caret from '../../../../../assets/img/icons/operations/caret.svg'
import deleteIcon from '../../../../../assets/img/icons/operations/delete.svg'
import DeleteModal from "../../../../UI/DeleteModal/DeleteModal";


const AppealsItem = ({updateStatus, feedbackEvent, event, ownerRole, number, status, ownerEmail, body, feedback, id}) => {

    const [active, setActive] = useState(false)
    const [deleteActive, setDeleteActive] = useState()

    const [feedbackText, setFeedbackText] = useState('')

    const deleteHandler = () => {
        event(id)
        setDeleteActive(false)
    }


    return (
        <div className={classes.container}>
            <DeleteModal active={deleteActive} event={deleteHandler} close={() => setDeleteActive(false)} title='обращение' />

            <div className={classes.info}>
                <h3>Обращение <strong className={classes.number}>№{number}</strong></h3>
                <h3>e-mail: {ownerEmail}</h3>
                <select value={status} onChange={e => updateStatus(id, e.target.value)}>
                    <option value={status}>{status}</option>
                    <option value="NEW">NEW</option>
                    <option value="Принято">Принято</option>
                    <option value="Отклонено">Отклонено</option>
                </select>
                <h3>Роль: {ownerRole}</h3>

                <div className={classes.actions}>
                    <button onClick={() => setActive(!active)} className={classNames(classes.actions__button, classes.caret, active ? classes.caret__rotate : null)}>
                        <img className={classes.icon} src={caret} alt="asfsaf"/>
                    </button>
                    <button onClick={() => setDeleteActive(true)} className={classes.actions__button}>
                        <img src={deleteIcon} alt=""/>
                    </button>
                </div>


            </div>
            <div className={classNames(classes.content, active ? classes.content__active : null)} >
                <div className={classes.body}>
                    <p>{body}</p>
                </div>
                <h4>Ответ: {feedback}</h4>
                <textarea onChange={e => setFeedbackText(e.target.value)} className={classes.feedback}></textarea>
                <button onClick={() => feedbackEvent(id, feedbackText)} className={classes.feedback__button}>Добавить ответ</button>
            </div>
        </div>
    );
};

export default AppealsItem;