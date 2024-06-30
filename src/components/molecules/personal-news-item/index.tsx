import MediaService from 'src/api/services/MediaService'
import classes from './style.module.scss'

import closeIcon from 'src/assets/icons/close.svg'
import DeleteModal from '../delete-modal'
import { useState } from 'react'
import { useUserStore } from 'src/store/user'
import NewsService from 'src/api/services/NewsService'
import { usePersonalNewsStore } from 'src/store/personal-news'

type PropsType = {
    id: string
    title: string
    body: string
    photoIds: any[]
}

const PersonalNewsItem = ({id, title, body, photoIds}:PropsType) => {

    const {token} = useUserStore()
    const {updateData} = usePersonalNewsStore()

    const [deleteActive, setDeleteActive] = useState(false)
    
    const del = async () => {
        await NewsService.deletePersonal(token, id)
        updateData(token)
        setDeleteActive(false)
    }

    return (
        <>
            <DeleteModal title='сообщение' event={del} active={deleteActive} close={() => setDeleteActive(false)}/>
            <div className={classes.container}>
                <div className={classes.header}>
                    <h3>{title}</h3>
                    <button onClick={() => setDeleteActive(true)} className='void-button'>
                        <img src={closeIcon} alt="((" />
                    </button>
                </div>
                <p>{body}</p>
                <div className={classes.photos}>
                    {photoIds.map(el => <div className={classes.img}><img src={MediaService.getFile(el)} alt="((" /></div>)}
                </div>
            </div>
        </>
    )
}

export default PersonalNewsItem