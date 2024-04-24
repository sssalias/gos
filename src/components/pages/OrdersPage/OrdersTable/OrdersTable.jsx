import React, {useState} from 'react';
import Table from "rc-table";
import DeleteButton from "../../../UI/Table/Operations/DeleteButton";
import MoreButton from "../../../UI/Table/Operations/MoreButton";
import OrderModal from "../OrderModal/OrderModal";
import { format } from 'date-fns';

const OrdersTable = (props) => {

    const [activeInfo, setActiveInfo] = useState(false)
    const [activeData, setActiveData] = useState({})


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
            <Table
                emptyText='Нет данных'
                columns={col}
                data={props.data}
            />
        </>
    );
};

export default OrdersTable;