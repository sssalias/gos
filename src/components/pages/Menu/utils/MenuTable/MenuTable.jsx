import React, {useState} from 'react';
import Table from "rc-table";
import DeleteButton from "../../../../UI/Table/Operations/DeleteButton";
import DeleteModal from '../../../../UI/DeleteModal/DeleteModal';

import classes from "./MenuTable.module.css";
import MediaService from "../../../../../services/MediaService";

const MenuTable = (props) => {


    const [selected, setSelected] = useState(null)

    const col = [
        {title: 'Фото', dataIndex: 'photoId', key: 'ph', render: (data, record) => (
                <div className={classes.photo}>
                    <img src={MediaService.getFile(data)}
                         alt=""/>
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
        props.delete ? {
            title: 'Действия',
            dataIndex: '',
            key: 'j',
            render: (data, record) => (
                <div style={{display: 'flex', gap: '10px'}}>
                    {/*<EditButton event={() => console.log(data.id)}/>*/}
                    <DeleteButton event={() => {
                        setSelected(data.id)
                        setDeleteActive(true)
                    }}/>
                </div>
            ),
        }: null
    ]

    const [deleteActive, setDeleteActive] = useState(false)

    const deleteHandler = () => {
        props.delete(selected)
        setDeleteActive(false)
    }

    return (
        <>
            <DeleteModal close={() => setDeleteActive(false)} active={deleteActive} event={deleteHandler} title='блюдо'/>
            <Table
                emptyText='Нет данных'
                columns={col}
                data={props.data}
            />
        </>
    );
};

export default MenuTable;