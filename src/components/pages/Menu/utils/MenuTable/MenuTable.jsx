import React from 'react';
import Table from "rc-table";
import DeleteButton from "../../../../UI/Table/Operations/DeleteButton";
import EditButton from "../../../../UI/Table/Operations/EditButton";

const MenuTable = (props) => {

    const col = [
        {title: 'Название', dataIndex: 'title', key: 'a'},
        {title: 'Цена', dataIndex: 'price', key: 'b'},
        {title: 'Калории', dataIndex: 'calories', key: 'c'},
        {title: 'Белки', dataIndex: 'proteins', key: 'd'},
        {title: 'Жиры', dataIndex: 'fats', key: 'e'},
        {title: 'Углеводы', dataIndex: 'carbohydrates', key: 'f'},
        {title: 'Время приготовления', dataIndex: 'cookingTime', key: 'g'},
        props.delete ? {
            title: 'Действия',
            dataIndex: '',
            key: 'j',
            render: (data, record) => (
                <div style={{display: 'flex', gap: '10px'}}>
                    {/*<EditButton event={() => console.log(data.id)}/>*/}
                    <DeleteButton event={() => props.delete(data.id)}/>
                </div>
            ),
        }: null
    ]

    return (
        <>
            <Table
                columns={col}
                data={props.data}
            />
        </>
    );
};

export default MenuTable;