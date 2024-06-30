import React from 'react'
import classes from './style.module.css'
import closeIcon from 'src/assets/icons/close.svg'

type PropsType = {
    active: boolean
    close: any
    title?: string,
    children?: React.ReactNode
}


const ModalTemplate = ({active, close, title, children}:PropsType) => {
    return (
        active ?
        <div className={classes.modal__wrapper}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <h2 style={{fontSize: 16}}>{title}</h2>
                    <button className='void-button' onClick={close}>
                        <img src={closeIcon} alt="(" />
                    </button>
                </div>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </div>
        : null
    )
}

export default ModalTemplate