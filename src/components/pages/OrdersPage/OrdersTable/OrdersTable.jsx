import React from 'react';
import Table from "rc-table";
import DeleteButton from "../../../UI/Table/Operations/DeleteButton";
import MoreButton from "../../../UI/Table/Operations/MoreButton";
import EditButton from "../../../UI/Table/Operations/EditButton";

const OrdersTable = (props) => {

    const col = [
        {title: 'Номер заказа', dataIndex: 'id', key: 'a'},
        {title: 'Цена', dataIndex: 'price', key: 'b'},
        {title: 'Кол-во порций', dataIndex: 'eatCount', key: 'c'},
        {title: 'Кол-во персон', dataIndex: 'personCount', key: 'd'},
        {title: 'Место подачи', dataIndex: 'place', key: 'e'},
        {title: 'Дата и время подачи', dataIndex: 'dateTime', key: 'f'},
        {title: 'Пожелания к заказу', dataIndex: 'prefer', key: 'g'},
        {title: 'Статус заказа', dataIndex: 'status', key: 'h'},
        {
            title: 'Действия',
            dataIndex: '',
            key: 'j',
            render: (text, record) => (
                <div style={{display: 'flex', gap: '10px'}}>
                    <MoreButton/>
                    <EditButton/>
                    <DeleteButton/>
                </div>
            ),
        }
    ]

    const data = [
        {id: '1328', price: 2000, eatCount: 2, personCount: 2, place: 'Кабинет', dateTime: '30.12.2023 14:00', prefer: '-', status: 'Доставлен', key: 1},
        {id: '1328', price: 2000, eatCount: 2, personCount: 2, place: 'Кабинет', dateTime: '30.12.2023 14:00', prefer: '-', status: 'Доставлен', key: 2},
        {id: '1328', price: 2000, eatCount: 2, personCount: 2, place: 'Кабинет', dateTime: '30.12.2023 14:00', prefer: '-', status: 'Доставлен', key: 3},
        {id: '1328', price: 2000, eatCount: 2, personCount: 2, place: 'Кабинет', dateTime: '30.12.2023 14:00', prefer: '-', status: 'Доставлен', key: 4},
    ]



    return (
        <>
            <Table
                columns={col}
                data={data}
            />
        </>
    );
};

export default OrdersTable;