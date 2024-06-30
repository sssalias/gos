import ModalTemplate from 'src/components/templates/modal-template'
import classes from './style.module.scss'
import { useState } from 'react'
import MediaService from 'src/api/services/MediaService'
import NewsService from 'src/api/services/NewsService'
import { useUserStore } from 'src/store/user'
import { usePersonalNewsStore } from 'src/store/personal-news'


type PropsType = {
    active: boolean
    close: any
    userId: string
}

const CreatePersonalNewsModal = ({active, close, userId}:PropsType) => {

    const {token} = useUserStore()
    const {updateData} = usePersonalNewsStore()

    const [data, setData] = useState({
        title: '',
        body: ''
    })


    const clearData = () => {
        setData({
            title: '',
            body: '',
        })
        setFiles([])
    }
    
    const [files, setFiles] = useState<any>([])
    
    const send = () => {
        const photoIds: any[] = []
        
        Promise.all([...files].map((el:any) => MediaService.upload(token, {file: el})))
            .then(res => {
                res.forEach(el => {
                    photoIds.push(el.data.id)                    
                })
                NewsService.createPersonal(token, {...data, photoIds, userId})
                    .then(() => {
                        close()
                        clearData()
                        updateData(token)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    return (
        <ModalTemplate title='Создать сообщение' active={active} close={close}>
            <form onSubmit={e => e.preventDefault()} className={classes.form}>
                <input onChange={e => setData({...data, title: e.target.value})} type="text" placeholder='Заголовок' />
                <textarea onChange={e => setData({...data, body: e.target.value})} placeholder='Содержание'></textarea>
                <input onChange={e => setFiles(e.target.files)} type="file" multiple/>
                <button onClick={send}>Создать</button>
                <div className={classes.file_list}>
                        <span>Загруженные файлы: </span>
                        <ul>
                            {[...files].map((el:any) => <li>{el.name}</li>)}
                        </ul>
                    </div>
            </form>
        </ModalTemplate>
    )
}

export default CreatePersonalNewsModal