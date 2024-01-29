import React from 'react';
import Table from "rc-table";
import DeleteButton from "../../../../UI/Table/Operations/DeleteButton";
import MoreButton from "../../../../UI/Table/Operations/MoreButton";
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
        {
            title: 'Действия',
            dataIndex: '',
            key: 'j',
            render: (text, record) => (
                <div style={{display: 'flex', gap: '10px'}}>
                    <EditButton/>
                    <DeleteButton/>
                </div>
            ),
        }
    ]

    // const data = [
    //     {title: 'Картошка', price: 2000, calories: 50, proteins: 50, fats: 25, carbohydrates:'50', cookingTime: '20 минут'},
    //     {title: 'Картошка', price: 2000, calories: 50, proteins: 50, fats: 25, carbohydrates:'50', cookingTime: '20 минут'},
    //     {title: 'Картошка', price: 2000, calories: 50, proteins: 50, fats: 25, carbohydrates:'50', cookingTime: '20 минут'},
    //     {title: 'Картошка', price: 2000, calories: 50, proteins: 50, fats: 25, carbohydrates:'50', cookingTime: '20 минут'},
    //     {title: 'Картошка', price: 2000, calories: 50, proteins: 50, fats: 25, carbohydrates:'50', cookingTime: '20 минут'},
    //     {title: 'Картошка', price: 2000, calories: 50, proteins: 50, fats: 25, carbohydrates:'50', cookingTime: '20 минут'},
    //     {title: 'Картошка', price: 2000, calories: 50, proteins: 50, fats: 25, carbohydrates:'50', cookingTime: '20 минут'}
    // ]

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