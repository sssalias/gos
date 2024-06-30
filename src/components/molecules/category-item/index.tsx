import { useUserStore } from 'src/store/user'
import classes from './style.module.css'
import close from 'src/assets/icons/close.svg'
import { useCategoriesStore } from 'src/store/categories'
import CategoriesService from 'src/api/services/CategoriesService'
import { useParams } from 'react-router-dom'
import ModalTemplate from 'src/components/templates/modal-template'
import MenuTable from 'src/components/organisms/tables/menu-table'
import { useState } from 'react'
import DeleteModal from '../delete-modal'

type PropsType = {
    data: any
}

const CategoriesItem = ({data}: PropsType) => {

    const {token} = useUserStore()

    const {updateData} = useCategoriesStore()
    
    const params = useParams()
    
    const [activeModalTable, setActiveModalTable] = useState(false)

    const [activeDelete, setActiveDelete] = useState(false)

    const del = async () => {
        console.log(data.id)
        await CategoriesService.del(token, data.id)
        updateData(token, params['*'] ? params['*'] : '')
    }

    return (
        <div className={classes.container}>
            <DeleteModal active={activeDelete} close={() => setActiveDelete(false)} event={del}  title='категорию'/>

            <ModalTemplate title={data.title} active={activeModalTable} close={() => setActiveModalTable(false)}>
                <MenuTable categoryId={data.id}/>
            </ModalTemplate>

            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <button 
                        onClick={() => setActiveDelete(true)}
                        className='void-button'>
                        <img src={close} alt="((" />
                    </button>
                </div>
                <div className={classes.content}>
                    <h3>{data.title}</h3>
                    <button onClick={() => setActiveModalTable(true) }>Подробнее</button>
                </div>
            </div>
        </div>
    )
}

export default CategoriesItem