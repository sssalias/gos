import React, {useEffect, useState} from 'react';
import Table from "rc-table";
import DeleteButton from "../../../UI/Table/Operations/DeleteButton";
import MoreButton from "../../../UI/Table/Operations/MoreButton";
import OrderModal from "../OrderModal/OrderModal";
import { format } from 'date-fns';


import classes from './OrdersTable.module.css'

const OrdersTable = (props) => {

    const [activeInfo, setActiveInfo] = useState(false)
    const [activeData, setActiveData] = useState({})

    const [filters, setFilters] = useState(
        {
            status: 'Все',
            price: -1,
            time: -1
        }
    )

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        setData(props.data)
        setFilteredData(props.data)
    }, [props.data]);


    useEffect(() => {
        if (filters.status === 'Все') {
            setFilteredData([...data])
        }
        if (filters.status !== 'Все') {
            setFilteredData( [...data.filter(el => el.status === filters.status)])
        }
    }, [filters.status, filteredData, data]);

    // useEffect(() => {
    //     if (filters.status === 'Все' ) {
    //         setFilteredData(data)
    //     }
    //     if (filters.status === 'Готовим') {
    //         setFilteredData(data.filter(el => el.status === 'Готовим'))
    //     }
    //     if (filters.status === 'Готов') {
    //         setFilteredData(data.filter(el => el.status === 'Готов'))
    //     }
    //     if (filters.status === 'Доставлен') {
    //         setFilteredData(data.filter(el => el.status === 'Доставлен'))
    //     }
    // }, [filters.status, filteredData, data])

    useEffect(() => {
        if (filters.price === 1 ) {
            console.log(filters.price)
            setFilteredData([...filteredData.sort((a, b) => +a.price - +b.price)])
        }
        if (filters.price === 0) {
            setFilteredData([...filteredData.sort((a, b) => +b.price - +a.price)])
        }
    }, [filters.price, filteredData, data])

    useEffect(() => {
        if (filters.time === 1 ) {
            setFilteredData([...filteredData.sort((a, b) => +a.submissionTime - +b.submissionTime)])
        }
        if (filters.time === 0) {
            setFilteredData([...filteredData.sort((a, b) => +b.submissionTime - +a.submissionTime)])
        }
    }, [filters.time, filteredData, data])
    const col = [
        {title: 'Номер заказа', dataIndex: 'number', key: 'a'},
        {title: 'Цена', dataIndex: 'price', key: 'b'},
        {title: 'Кол-во персон', dataIndex: 'countOfPersons', key: 'd'},
        {title: 'Место подачи', dataIndex: 'placeOfDelivery', key: 'e'},
        {title: 'Дата и время подачи', dataIndex: 'submissionTime', key: 'f', render: (data, record) => (
            <span>
                {format(data, 'dd.MM.yyyy kk:mm')}
            </span>
            )},
        {title: 'Пожелания к заказу', dataIndex: 'wishes', key: 'g'},
        {title: 'Метод оплаты', dataIndex: 'paymentMethod', key: 'j'},
        {
            title: 'Статус заказа',
            dataIndex: 'status',
            key: 'h',
            render: (data, record) => (
                <select value={data} onClick={() => console.log(data)} onChange={(e) => {
                    props.update(record.id, e.target.value, {...record})
                }}>
                    <option value="Готовим">Готовим</option>
                    <option value="Готов">Готов</option>
                    <option value="Доставлен">Доставлен</option>
                </select>
            )
        },
        {
            title: 'Действия',
            dataIndex: '',
            key: 'j',
            render: (data, record) => (
                <div style={{display: 'flex', gap: '10px'}}>
                    <MoreButton event={() => {
                                setActiveInfo(true)
                                setActiveData(data)
                            }
                        }
                    />
                </div>
            ),
        }
    ]

    return (
        <>
            <OrderModal data={activeData} close={() => setActiveInfo(false)} active={activeInfo}/>
            <div className={classes.filter}>
                <div>
                    <span>Статус </span>
                    <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
                        <option value="Все">Все</option>
                        <option value="Готовим">Готовим</option>
                        <option value="Готов">Готов</option>
                        <option value="Доставлен">Доставлен</option>
                    </select>
                </div>

                <div>
                    <span>Цена </span>
                    <select value={filters.price} onChange={e => setFilters({...filters, price: +e.target.value})}>
                        <option value="-1">-</option>
                        <option value="1">По возрастанию</option>
                        <option value="0">По убыванию</option>
                    </select>
                </div>
                <div>
                    <span>Дата </span>
                    <select value={filters.time} onChange={e => setFilters({...filters, price: +e.target.value})}>
                        <option value="-1">-</option>
                        <option value="1">По возрастанию</option>
                        <option value="0">По убыванию</option>
                    </select>
                </div>
            </div>
            <div className={classes.container}>
                <Table
                    emptyText='Нет данных'
                    columns={col}
                    // data={props.data}
                    data={filteredData}
                />
            </div>
        </>
    );
};

export default OrdersTable;