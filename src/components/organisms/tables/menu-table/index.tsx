import MediaService from 'src/api/services/MediaService'
import classes from './style.module.css'

import holder from 'src/assets/holder.jpg'
import { useEffect, useState } from 'react'
import Table from 'rc-table'
import { useDishesStore } from 'src/store/dishes'
import { useUserStore } from 'src/store/user'
import DishServices from 'src/api/services/DishServices'

import CreateDish from '../../create-dish'


import deleteIcon from 'src/assets/icons/operations/delete.svg'
import editIcon from 'src/assets/icons/operations/edit.svg'
import UpdateDish from '../../update-dish'
import DeleteModal from 'src/components/molecules/delete-modal'

type PropsType = {
    categoryId: string
}

const MenuTable = ({categoryId}:PropsType) => {

    const {setData, data, updateData} = useDishesStore()
    const {token} = useUserStore()

    const [selected, setSelected] = useState<any>(null)

    const [activeDelete, setActiveDelete] = useState(false) 


    const del = async () => {
        if (selected) {
            await DishServices.del(token, selected.id)
            updateData(token, categoryId)
            setActiveDelete(false)
        }
    }
    
    useEffect(() => {
        const get = async () => {
            if (token.length !== 0) {
                const {data} = await DishServices.get(token, categoryId)
                setData(data)
            }
        }
        get()
    }, [token])

    const col = [
        {title: 'Фото', dataIndex: 'photoId', key: 'ph', render: (data:any) => (
                <div className={classes.photo}>
                    <img src={data ? MediaService.getFile(data) : holder} alt="err"/>
                </div>

            )
        },
        {title: 'Название', dataIndex: 'title', key: 'a'},
        {title: 'Цена', dataIndex: 'price', key: 'b'},
        {title: 'Время приготовления', dataIndex: 'cookingTime', key: 'g'},
        {title: 'Вес', dataIndex: 'weight', key: 'w'},
        {title: 'Калории', dataIndex: 'calories', key: 'c'},
        {title: 'Белки', dataIndex: 'proteins', key: 'd'},
        {title: 'Жиры', dataIndex: 'fats', key: 'e'},
        {title: 'Углеводы', dataIndex: 'carbohydrates', key: 'f'},
        {
            title: 'Действия',
            dataIndex: '',
            key: 'j',
            render: (_:any, record:any) => (
                <div style={{display: 'flex', gap: '10px'}}>
                    <button
                        onClick={() => {
                            setSelected(record)
                            setActiveDelete(true)
                        }}
                        className='table-button'>
                        <img src={deleteIcon} alt="((" />
                    </button>
                    <button
                        onClick={() => {
                            setActiveEdit(true)
                            setSelected(record)
                        }}
                        className='table-button'
                    >
                        <img  src={editIcon} alt="(" />
                    </button>
                </div>
            ),
        }
    ]

    const [activeCreate, setActiveCreate] = useState(false)
    const [activeEdit, setActiveEdit] = useState(false)


    return (
        <div className={classes.container}>
            <Table
                emptyText='Нет данных'
                columns={col}
                data={data}
                sticky={true}
                scroll={{ y: 300 }}
            />
            <DeleteModal active={activeDelete} event={del} close={() => setActiveDelete(false)} title='блюдо' />
            <UpdateDish old={selected} id={categoryId} active={activeEdit} close={() => setActiveEdit(false)}/>
            <CreateDish id={categoryId} active={activeCreate} close={() => setActiveCreate(false)}/>
            <button onClick={() => setActiveCreate(true)} style={{width: '100%'}}>+</button>
        </div>
    )
}

export default MenuTable