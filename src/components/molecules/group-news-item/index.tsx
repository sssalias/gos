import GroupNewsModal from 'src/components/organisms/group-news-modal'
import classes from './style.module.scss'
import deleteIcon from 'src/assets/icons/operations/delete.svg'
import moreIcon from 'src/assets/icons/operations/more.svg'
import { useState } from 'react'
import DeleteModal from '../delete-modal'
import NewsService from 'src/api/services/NewsService'
import { useUserStore } from 'src/store/user'
import { useNewsStore } from 'src/store/news'


type PropsType = {
    title: string
    body: string
    data: any
}


const GroupNewsItem = ({title, body, data}: PropsType) => {

    const [groupModalActive, setGroupModalActive] = useState(false)
    const [deleteModalActive, setDeleteModalActive] = useState(false)
    
    const {token} = useUserStore()
    const {updateData} = useNewsStore()

    const del = async () => {
        await NewsService.deleteForGroup(token, data.id)
        updateData(token)
        setDeleteModalActive(false)
    }

    return (
        <>
            <GroupNewsModal data={data} active={groupModalActive} close={() => setGroupModalActive(false)}/>
            <DeleteModal event={del} title='новость' active={deleteModalActive} close={() => setDeleteModalActive(false)}/>
            <div className={classes.container}>
                <div className={classes.wrapper}>
                    <div className={classes.header}>
                        <div className={classes.info}>
                            <h3>{title}</h3>
                            <h3>Категория: {data.forUserTypes}</h3>
                        </div>
                        <div className={classes.actions}>
                            <button onClick={() => setGroupModalActive(true)} className='table-button'>
                                <img src={moreIcon} alt="((((" />
                            </button>
                            <button onClick={() => setDeleteModalActive(true)} className='table-button'>
                                <img src={deleteIcon} alt="((((" />
                            </button>
                        </div>
                    </div>
                    <p>{body}</p>
                </div>
            </div>
        </>
    )
}

export default GroupNewsItem