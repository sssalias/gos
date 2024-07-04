import { useRef, useState } from 'react'
import classes from './style.module.css'
import classNames from 'classnames'


import caretIcon from 'src/assets/icons/operations/caret.svg'
import deleteIcon from 'src/assets/icons/operations/delete.svg'
import paperclipIcon from 'src/assets/icons/operations/paperclip.svg'
import sendIcon from 'src/assets/icons/operations/send.svg'

import MediaService from 'src/api/services/MediaService'
import { useAppealsStore } from 'src/store/appeals'
import AppealsService from 'src/api/services/AppealsService'
import { useUserStore } from 'src/store/user'
import DeleteModal from '../delete-modal'

type PropsType = {
    photoId?: string | null
    ownerRole: string
    number: number
    status: string
    ownerEmail: string
    body: string
    id: string
    comments: any[]
}

const AppealsItem = ({photoId, ownerRole, number, status, ownerEmail, body, id, comments}:PropsType) => {    
    const [active, setActive] = useState(false)

    const [data, setData] = useState({
        body: '',
    })

    const statuses = ['NEW', 'Принято', 'Отклонено']

    const {token} = useUserStore()
    const {updateData} = useAppealsStore()

    const [activeDelete, setActiveDelete] = useState(false)

    const del = async () => {
        await AppealsService.del(token, id)
        updateData(token)
    }

    const send = async () => {
        const photoIds: any[] = []
        
        Promise.all([...files].map((el:any) => MediaService.upload(token, {file: el})))
            .then(res => {
                res.forEach(el => {
                    photoIds.push(el.data.id)                    
                })
                AppealsService.sendComment(token, id, {...data, photoIds})
                    .then(() => {
                        updateData(token)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const inputRef = useRef<any>(null)

    const [files, setFiles] = useState<any>([])

    return (
        <div className={classes.container}>
            <DeleteModal active={activeDelete} event={del} close={() => setActiveDelete(false)} title='обращение' />

            <div className={classes.info}>
                <h3>Обращение <strong className={classes.number}>№{number}</strong></h3>
                <h3>e-mail: {ownerEmail}</h3>
                <select value={status} onChange={e => {
                    const upd = async () => {
                        await AppealsService.updateStatus(token, id, e.target.value)
                        updateData(token)
                    }
                    upd()
                }}>
                    <option value={status}>{status}</option>
                    {statuses.map(el => (
                        status !== el ? <option key={el} value={el}>{el}</option> : null
                    ))}
                </select>
                <h3>Роль: {ownerRole}</h3>

                <div className={classes.actions}>
                    <button onClick={() => setActive(!active)} className={classNames(classes.actions__button, classes.caret, active ? classes.caret__rotate : null)}>
                        <img className={classes.icon} src={caretIcon} alt="asfsaf"/>
                    </button>
                    <button onClick={() => setActiveDelete(true)} className={classes.actions__button}>
                        <img className={classes.icon} src={deleteIcon} alt="(("/>
                    </button>
                </div>


            </div>
            <div className={classNames(classes.content, active ? classes.content__active : null)} >
                <div className={classes.body}>
                        {photoId ?
                            <div className={classes.photo}>
                                <img src={MediaService.getFile(photoId)} alt="Нет фото"/>
                            </div>: null}
                    <p>{body}</p>
                </div>
                <div className={classes.chat_container}>
                    <div className={classes.msg_container}>
                        {comments.map(el => <div className={classNames(classes.msg_item, el.senderRole === 'admin' ? classes.msg_admin : classes.msg_user)}>
                            <span>{el.body}</span>
                            <div className={classes.msg_photos}>
                                {el.photoIds.map((el:any) => <div className={classes.msg_img}><img src={MediaService.getFile(el)} alt='((('/></div>)}
                            </div>
                            </div>)}
                    </div>
                    <div className={classes.chat_send}>
                        <textarea onChange={e => setData({...data, body: e.target.value})} className={classes.chat_field}></textarea>
                        <input onChange={e => {
                            //@ts-ignore
                            setFiles([...files, ...e.target.files])
                        }} multiple ref={inputRef} type="file" className={classes.chat_file}/>
                        <button onClick={() => inputRef.current.click()} className={classes.chat_photo_button}>
                            <img src={paperclipIcon} alt="((" />
                        </button>
                        <button onClick={send} className={classes.chat_button}>
                            <img src={sendIcon} alt="((" />
                        </button>
                    </div>
                    <div className={classes.chat_photos}>
                        <ul>
                            {[...files].map(el => <li>{el.name} <button onClick={() => setFiles([...files].filter(f => f.name !== el.name))} className='void-button'>☓</button> </li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppealsItem