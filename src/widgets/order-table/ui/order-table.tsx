import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button, Select, SelectItem, useDisclosure} from '@nextui-org/react'
import { useOrdersStore } from 'src/store/orders'
import { columns, statuses } from 'src/widgets/order-table/libs'

import {format} from 'date-fns'
import { useCallback, useState } from 'react'
import { changeStatus } from 'src/widgets/order-table/api/changeStatus'
import { useKeycloak } from '@react-keycloak/web'
import { FaInfo } from 'react-icons/fa6'
import { OrderDishTable } from 'src/entities/order'
import { useAsyncList } from '@react-stately/data'


const OrderTable = () => {

    const [selectItem, setSelectedItem] = useState({
        id: '',
        dishes: []
    })

    const info = useDisclosure()

    const {data, updateData} = useOrdersStore()
    const {keycloak} = useKeycloak()

    const renderCell = useCallback((row, key) => {
        console.log(row)
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

    const list = useAsyncList({
        async load() {
            console.log(data)
            return {
                items: data
            }
        },
        async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a, b) => {
                    //@ts-ignore
                    const first = a[sortDescriptor.column];
                    //@ts-ignore
                    const second = b[sortDescriptor.column];
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
            
                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }
            
                    return cmp;
                }),
            };
        }
    })


    return (
        <>
            <Table aria-label="Example table with dynamic content" sortDescriptor={list.sortDescriptor} onSortChange={list.sort}>
                <TableHeader columns={columns}>
                    {(column) => <TableColumn allowsSorting key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={list.items}>
                    {(item) => (
                    <TableRow key={item.key}>   
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                    )}
                </TableBody>
            </Table>
            <OrderDishTable dishes={selectItem.dishes} isOpen={info.isOpen} onOpenChange={info.onOpenChange}/>
        </>
    )
}

export default OrderTable