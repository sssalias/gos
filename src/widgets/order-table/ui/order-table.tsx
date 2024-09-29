import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Select, SelectItem, useDisclosure} from '@nextui-org/react'
import { useOrdersStore } from 'src/store/orders'
import { columns, statuses } from 'src/widgets/order-table/libs'

import {format} from 'date-fns'
import { useCallback, useState } from 'react'
import { changeStatus } from 'src/widgets/order-table/api/changeStatus'
import { useKeycloak } from '@react-keycloak/web'
import { FaInfo } from 'react-icons/fa6'
import { OrderDishTable } from 'src/entities/order'
import { ListLayout } from 'src/layout/ui'
import { getUserData } from 'src/widgets/header/api'

const OrderTable = () => {

    const [selectItem, setSelectedItem] = useState({
        id: '',
        dishes: [],
        placeOfDelivery: '',
        countOfPersons: 0,
        wishes: '',
        submissionTime: '',
        paymentMethod: '',
        status: ''
    })

    const info = useDisclosure()

    const {data, updateData} = useOrdersStore()
    const {keycloak} = useKeycloak()

    const renderCell = useCallback((row, key) => {
        const cellValue = row[key]

        switch (key) {
            case 'submissionTime':
                return (
                    <span>{format(cellValue, 'dd.MM.yyyy kk:mm')}</span>
                )
            case 'status':
                return (
                    <Select onChange={e => changeStatus(keycloak.token, row.id, e.target.value, row, updateData)} defaultSelectedKeys={[row.status]}>
                        {statuses.map(item => (
                            <SelectItem key={item.key}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                )
            case 'actions':
                return (
                   <div className='flex gap-2 justify-center'>
                        <Button onPress={() => {
                            setSelectedItem(row)
                            info.onOpen()
                        }} isIconOnly variant='solid' color='primary' size='sm'>
                            <i><FaInfo/></i>
                        </Button>
                   </div> 
                )
            default:
                return cellValue
        }
    }, [])

    const [filter, setFilter] = useState('ВСЕ')
    const [sorting, setSorting] = useState({
        price: 3,
        date: 3
    })

    const user = getUserData(keycloak.token)

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between gap-4'>
                <Select onChange={e => setFilter(e.target.value)} label='Статус'>
                    <SelectItem key='ВСЕ'>ВСЕ</SelectItem>
                    <SelectItem key='Готовится'>Готовится</SelectItem>
                    <SelectItem key='Готов'>Готов</SelectItem>
                    <SelectItem key='Доставлен'>Доставлен</SelectItem>
                </Select>
                <Select defaultSelectedKeys={sorting.price.toString()} value={sorting.price} onChange={e => setSorting({date: 3, price: +e.target.value})} label='Цена'>
                    <SelectItem key='3'>-</SelectItem>
                    <SelectItem key='1'>По возрастанию</SelectItem>
                    <SelectItem key='0'>По убыванию</SelectItem>
                </Select>
                <Select defaultSelectedKeys={sorting.date.toString()} value={sorting.date} onChange={e => setSorting({price: 3, date: +e.target.value})} label='Дата'>
                    <SelectItem key='3'>-</SelectItem>
                    <SelectItem key='1'>По возрастанию</SelectItem>
                    <SelectItem key='0'>По убыванию</SelectItem>
                </Select>
            </div>
            <ListLayout dataCount={data.length}>
                <Table isHeaderSticky aria-label="Example table withasasfasfas dynamic content" >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn allowsSorting key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={data
                            .filter(el => filter === 'ВСЕ' ? el : el.status === filter)
                            .sort((a, b) => sorting.price === 1 ?  +a.price - +b.price : +b.price - +a.price)
                            .sort((a, b) => sorting.date === 1 ? new Date(a.submissionTime) - new Date(b.submissionTime) : new Date(b.submissionTime) - new Date(a.submissionTime))}>
                        {(item) => (
                        <TableRow key={item.key}>   
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
                <OrderDishTable item={selectItem} id={selectItem.id} dishes={selectItem.dishes} isOpen={info.isOpen} onOpenChange={info.onOpenChange}/>
            </ListLayout>
        </div>
    )
}

export default OrderTable