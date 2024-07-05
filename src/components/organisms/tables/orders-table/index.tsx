import { format } from 'date-fns'
import Table from 'rc-table'
import { useEffect, useState } from 'react'
import MediaService from 'src/api/services/MediaService'
import OrdersService from 'src/api/services/OrdersService'
import ModalTemplate from 'src/components/templates/modal-template'
import { useOrdersStore } from 'src/store/orders'
import { useUserStore } from 'src/store/user'

import holder from 'src/assets/holder.jpg'
import PersonalNewsModal from '../../personal-news-modal'

import sendIcon from 'src/assets/icons/operations/send.svg'
import moreIcon from 'src/assets/icons/operations/more.svg'


const OrdersTable = () => {

    const [modalIsOpen, setModalOoen] = useState(false)
    const [personalNewsModal, setPersonalNewsModal] = useState(false)
    const [currentData, setCurrentData] = useState<any>([])

    const {token} = useUserStore()
    const {updateData, data, filters, filteredData, setFilteredData, setFilters} = useOrdersStore()


    const columns = [
        {title: 'Номер заказа', dataIndex: 'number', key: 'a'},
        {title: 'Цена', dataIndex: 'price', key: 'b'},
        {title: 'Кол-во персон', dataIndex: 'countOfPersons', key: 'd'},
        {title: 'Место подачи', dataIndex: 'placeOfDelivery', key: 'e'},
        {title: 'Дата и время подачи', dataIndex: 'submissionTime', key: 'f', render: (data:any) => (
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
            render: (data:any, record:any) => (
                <select value={data} onClick={() => console.log(data)} onChange={(e) => {
                    if (token.length !== 0) {
                        const update = async () => {
                            await OrdersService.updateStatus(token, record.id, e.target.value, {...record})
                            await updateData(token)
                        }
                        update()
                    }
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
            render: (data:any) => (
                <div style={{display: 'flex', gap: 10}}>
                    <button className='table-button' onClick={() => {
                        setModalOoen(true)
                        setCurrentData(data)
                    }}>
                        <img src={moreIcon} alt="((" />
                    </button>
                    <button className='table-button' onClick={() => {
                        setPersonalNewsModal(true)
                        setCurrentData(data)
                    }}>
                        <img src={sendIcon} alt="((" />
                    </button>
                </div>
            )
        }
    ]



    const dishesColumns = [
        {title: 'Фото', dataIndex: 'photoId', key: 'ph', render: (data:any) => (
            <div style={{height: 32, width: 32}}>
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
    ]


    useEffect(() => {
        if (filters.status === 'Все') {
            setFilteredData(data)
        } else {
            setFilteredData([...data.filter(el => el.status === filters.status)])
        }
    }, [filters.status, data])


    useEffect(() => {
        if (filters.price === 1) {
            setFilteredData([...filteredData.sort((a, b) => +a.price - +b.price)])
        }
        if (filters.price === 0) {
            setFilteredData([...filteredData.sort((a, b) => +b.price - +a.price)])
        }
    }, [filters.price, data])


    useEffect(() => {
        if (filters.time === 1) {
            //@ts-ignore
            setFilteredData([...filteredData.sort((a, b) => new Date(a.submissionTime) - new Date(b.submissionTime))])
        }
        if (filters.time === 0) {
             //@ts-ignore
            setFilteredData([...filteredData.sort((a, b) => new Date(b.submissionTime) - new Date(a.submissionTime))])
        }
    }, [filters.price, data])

    return (
        <>
            <ModalTemplate active={modalIsOpen} close={() => setModalOoen(false)} title={`Заказ №${currentData?.number}`}>
                <Table
                    emptyText='Нет данных'
                    columns={dishesColumns}
                    data={currentData?.dishes}
                />
            </ModalTemplate>

            <PersonalNewsModal userId={currentData?.userId} active={personalNewsModal} close={() => setPersonalNewsModal(false)}/>


            <nav style={{display: 'flex', gap: 10}}>
                <section>
                    <span>Статус: </span>
                    <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
                        <option value="Все">Все</option>
                        <option value="Готовим">Готовим</option>
                        <option value="Готов">Готов</option>
                        <option value="Доставлен">Доставлен</option>
                    </select>
                </section>

                <section>
                    <span>Цена: </span>
                    <select value={filters.price} onChange={e => setFilters({...filters, price: +e.target.value, time: -1})}>
                        <option value="-1">-</option>
                        <option value="1">По возрастанию</option>
                        <option value="0">По убыванию</option>
                    </select>
                </section>


                <section>
                    <span>Дата: </span>
                    <select value={filters.time} onChange={e => setFilters({...filters, time: +e.target.value, price: -1})}>
                        <option value="-1">-</option>
                        <option value="1">По возрастанию</option>
                        <option value="0">По убыванию</option>
                    </select>
                </section>

            </nav>
            <Table
                emptyText='Нет данных'
                data={filteredData}
                columns={columns}
            />
        </>
    )
}

export default OrdersTable