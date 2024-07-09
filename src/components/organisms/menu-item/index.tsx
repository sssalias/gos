import classes from './style.module.css'
import CategoriesList from '../categories-list'
import { useEffect, useState } from 'react'
import CategoriesService from 'src/api/services/CategoriesService'
import { useUserStore } from 'src/store/user'
import { useCategoriesStore } from 'src/store/categories'
import MenuService from 'src/api/services/MenuService'

import trashIcon from 'src/assets/icons/trash.svg'
import DeleteModal from 'src/components/molecules/delete-modal'
import { useMenuStore } from 'src/store/menu'

type PropsType = {
    title: string,
    menu: any,
    id: string,
    dateTo: string
}

const MenuItem = ({title, menu, id, dateTo}:PropsType) => {

    const {token} = useUserStore()
    const {setData, updateData} = useCategoriesStore()
    const updateMenuState = useMenuStore(state => state.updateData) 

    const [file, setFile] = useState<any>(null)


    const [activeDeleteModal, setActiveDeleteModal] = useState(false)

    useEffect(() => {
        const get = async () => {
            if (token.length !== 0) {
                const {data} = await CategoriesService.get(token, id)
                setData(data)
            }
        }
        get()
    }, [token])


    const del = async () => {
        await MenuService.clear(token, id)
        updateData(token, id)
        setActiveDeleteModal(false)
    }

    return (
        <div className={classes.container}>
            <DeleteModal title='все позиции меню' active={activeDeleteModal} close={() => setActiveDeleteModal(false)} event={del}/>
            <div className={classes.header}>
                <h1>{title} {dateTo}</h1>
                <button onClick={() => setActiveDeleteModal(true)} className='table-button'>
                    <img  src={trashIcon} alt="((" />
                </button>
            </div>
            <CategoriesList/>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 20
            }}>
                <input required={true} type="file" onChange={e => setFile(e.target.files?.item(0))}/>
                <button onClick={() => {
                    if (file) {
                        const parse = async () => {
                            await MenuService.parse(token, {file: file, menuType: menu.type})
                            updateData(token, id)
                            updateMenuState(token)
                        }
                        parse()
                    }
                }}>Импортировать меню</button>
            </div>
        </div>
    )
}

export default MenuItem