import ModalTemplate from 'src/components/templates/modal-template'
import classes from './style.module.scss'
import {useState } from 'react'
import MediaService from 'src/api/services/MediaService'
import { useUserStore } from 'src/store/user'
import NewsService from 'src/api/services/NewsService'
import { useNewsStore } from 'src/store/news'

const CreateGroupNewsItem = () => {

    const {token} = useUserStore()
    const {updateData} = useNewsStore()

    const [modalActive, setModalActive] = useState(false)
    const [data, setData] = useState<any>({
        title: '',
        body: '',
        forUserTypes: 'user'
    })

    
    const [files, setFiles] = useState<any>([])

    const clearData = () => {
        setData({
            title: '',
            body: '',
            forUserTypes: 'user'
        })
        setFiles([])
    }

    const sendData = async () => {
        const photoIds: any[] = []
        
        Promise.all([...files].map((el:any) => MediaService.upload(token, {file: el})))
            .then(res => {
                res.forEach(el => {
                    photoIds.push(el.data.id)                    
                })
                NewsService.createForGroup(token, {...data, photoIds})
                    .then(() => {
                        setModalActive(false)
                        clearData()
                        updateData(token)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <ModalTemplate title='Создать новость' active={modalActive} close={() => {
                setModalActive(false)
                clearData()
            }}>
                <form className={classes.form} onSubmit={e => e.preventDefault()}>
                    <input onChange={e => setData({...data, title: e.target.value})} type="text" placeholder='Заголовок' />
                    <textarea onChange={e => setData({...data, body: e.target.value})} placeholder='Содержание'></textarea>
                    <label>
                        <span>Группа пользователей: </span>
                        <select value={data.forUserTypes} onChange={e => setData({...data, forUserTypes: e.target.value})}>
                            <option value="user">ВСЕ</option>
                            <option value="vip">VIP</option>
                            <option value="super_vip">SUPER_VIP</option>
                        </select>
                    </label>
                    <input type="file" multiple onChange={e => setFiles(e.target.files)}/>
                    <div className={classes.file_list}>
                        <span>Загруженные файлы: </span>
                        <ul>
                            {[...files].map((el:any) => <li>{el.name}</li>)}
                        </ul>
                    </div>
                    <button onClick={sendData}>Создать</button>
                </form>
            </ModalTemplate>
            <div className={classes.container} onClick={() => setModalActive(true)}>
                <div className={classes.wrapper}>
                    <h3>+</h3>
                </div>
            </div>
        </>
    )
}

export default CreateGroupNewsItem