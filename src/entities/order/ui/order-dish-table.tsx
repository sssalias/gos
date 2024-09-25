import { Modal, ModalBody, ModalContent, ModalHeader, Image, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { useCallback } from 'react'
import { columns } from 'src/entities/order/libs'

type Props = {
    dishes: any[]
    isOpen: boolean
    onOpenChange
}
const OrderDishTable: React.FC<Props> = props => {

    const renderCell = useCallback((row, key) => {
        const cellValue = row[key]        
        switch (key) {
            case 'photoId':
                return (
                    <Image
                        src={cellValue}
                        height={50}
                        width={50}
                    />
                )
            case 'title':
                return (
                    <h2 className='font-semibold'>{cellValue}</h2>
                )
            case 'price':
                return (
                    <span>{cellValue}₽</span>
                )
            case 'cookingTime':
                return (
                    <span>{cellValue} мин.</span>
                )
            default:
                return cellValue
        }
    }, [])

    return (
        <Modal size='5xl' isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                <ModalHeader>Заказ </ModalHeader>
                <ModalBody>
                    <Table aria-label="Example table with dynamic content">
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={props.dishes}>
                            {(item) => (
                            <TableRow key={item.key}>   
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
export default OrderDishTable