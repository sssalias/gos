import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button, Select, SelectItem, useDisclosure} from '@nextui-org/react'
import { useOrdersStore } from 'src/store/orders'
import { columns, statuses } from 'src/widgets/order-table/libs'

import {format} from 'date-fns'
import { useCallback, useState } from 'react'
import { changeStatus } from 'src/widgets/order-table/api/changeStatus'
import { useKeycloak } from '@react-keycloak/web'
import { FaInfo } from 'react-icons/fa6'
import { OrderDishTable } from 'src/entities/order'
import { ListLayout } from 'src/layout/ui'

const OrderTable = () => {

    const [selectItem, setSelectedItem] = useState({
        id: '',
        dishes: []
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

    return (
        <>
            <div className='flex justify-between'>
                <Select onChange={e => setFilter(e.target.value)} label='Статус'>
                    <SelectItem key='ВСЕ'>ВСЕ</SelectItem>
                    <SelectItem key='Готовится'>Готовится</SelectItem>
                    <SelectItem key='Готов'>Готов</SelectItem>
                    <SelectItem key='Доставлен'>Доставлен</SelectItem>
                </Select>  
            </div>
            <ListLayout dataCount={data.length}>
                <Table isHeaderSticky aria-label="Example table with dynamic content" >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn allowsSorting key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={data.filter(el => filter === 'ВСЕ' ? el : el.status === filter)}>
                        {(item) => (
                        <TableRow key={item.key}>   
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
                <OrderDishTable dishes={selectItem.dishes} isOpen={info.isOpen} onOpenChange={info.onOpenChange}/>
            </ListLayout>
        </>
    )
}

export default OrderTable