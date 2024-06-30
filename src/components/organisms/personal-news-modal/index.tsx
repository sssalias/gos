import ModalTemplate from 'src/components/templates/modal-template'
import PersonalNewsList from '../personal-news-list'
import { useEffect } from 'react'
import NewsService from 'src/api/services/NewsService'
import { useUserStore } from 'src/store/user'
import { usePersonalNewsStore } from 'src/store/personal-news'

type PropsType = {
    active: boolean
    close: any
    userId: string
}

const PersonalNewsModal = ({active, close, userId}:PropsType) => {

    const {token} = useUserStore()
    const {setData} = usePersonalNewsStore()
    
    useEffect(() => {
        console.log('asfasfasfasfsafasfasfas');
        

        const getData = async () => {
            if (token.length !== 0) {
                const {data} = await NewsService.getPersonal(token)
                setData(data)  
            }
        }
        getData()
    }, [token])
    
    return (
        <ModalTemplate title='Сообщение пользователю' active={active} close={close}>
            <PersonalNewsList userId={userId}/>
        </ModalTemplate>
    )
}

export default PersonalNewsModal