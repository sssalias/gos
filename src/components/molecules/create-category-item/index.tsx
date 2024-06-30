import ModalTemplate from 'src/components/templates/modal-template'
import classes from './style.module.css'
import { useState } from 'react'
import CategoriesService from 'src/api/services/CategoriesService'
import { useUserStore } from 'src/store/user'
import { useParams } from 'react-router-dom'
import { useCategoriesStore } from 'src/store/categories'

const CreateCategoryItem = () => {

    const [activeModal, setActiveModal] = useState(false)

    const [title, setTitle] = useState('')

    const {token} = useUserStore()

    const {updateData} = useCategoriesStore()

    const params = useParams()
    

    return (
        <div className={classes.container}>
            <ModalTemplate close={() => setActiveModal(false)} active={activeModal} title='Создать категорию'>
                <div className={classes.modal__container}>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Название категории'/>
                    <button onClick={() => {
                        const create = async () => {
                            await CategoriesService.create(token, title, params['*'] ? params['*'] : '')
                            updateData(token, params['*'] ? params['*'] : '')
                        }
                        create()
                        setActiveModal(false)
                    }}>Создать</button>
                </div>
            </ModalTemplate>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <button onClick={() => setActiveModal(true) }>+</button>
                </div>
            </div>
        </div>
    )
}

export default CreateCategoryItem