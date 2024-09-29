import { Modal, ModalBody, ModalContent, ModalHeader, Image, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useCallback, useState } from 'react'
import { deleteDish } from 'src/entities/order/api'
import { columns } from 'src/entities/order/libs'
import { useOrdersStore } from 'src/store/orders'

type Props = {
    dishes: any[]
    isOpen: boolean
    id: string,
    item: any,
    onOpenChange: () => void
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

    const [selectedIds, setSelectedIds] = useState<Selection>(new Set<string>())

    const {keycloak} = useKeycloak()
    const {updateData} = useOrdersStore()

    return (
        <Modal size='5xl' isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                <ModalHeader>Заказ </ModalHeader>
                <ModalBody>
                    <Table 
                        aria-label="Examasfasfasple table with dynamic content"
                        selectionMode='multiple'
                        selectionBehavior='toggle'
                        onSelectionChange={ (keys: Selection) => setSelectedIds(new Set(keys)) }
                    >
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
                    <div className='flex gap-4'>
                        <Button 
                            onClick={() => deleteDish(keycloak.token, props.item, props.id, selectedIds, updateData)}
                            variant='solid' 
                            color='danger'>
                            Удалить 
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
export default OrderDishTable