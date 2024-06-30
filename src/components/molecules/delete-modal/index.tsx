import ModalTemplate from 'src/components/templates/modal-template'
import classes from './style.module.css'


type PropsType = {
    close: any
    active: boolean
    title: string
    event: any
}

const DeleteModal = ({close, active, title, event}:PropsType) => {
    return (
        <ModalTemplate close={close} active={active} title={`Вы уверены, что хотите удалить ${title}?`}>
            <div className={classes.container}>
                <button onClick={event}>Да</button>
                <button onClick={close} style={{background: 'lightgrey', borderColor: 'lightgrey', color: 'black'}}>Отмена</button>
            </div>
        </ModalTemplate>
    )
}

export default DeleteModal