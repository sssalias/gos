import { Button, Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useCallback, useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { deleteDish } from 'src/entities/dish/api'
import { columns } from 'src/entities/dish/libs'
import EditDishModal from 'src/entities/dish/ui/edit-dish-modal'
import { DeleteConfirm } from 'src/shared/ui'
import { useDishesStore } from 'src/store/dishes'

const DishTable: React.FC = () => {
    
    const {categoryId} = useParams()

    const {keycloak} = useKeycloak()

    const {data} = useDishesStore()

    const confirm = useDisclosure()
    const edit = useDisclosure()

    const {updateData} = useDishesStore()

    const [selectedItem, setSelectedItem] = useState({
        photoId: '',
        id: '',
        title: '',
        price: '',
        cookingTime: '',
        calories: '',
        proteins: '',
        fats: '',
        carbohydrates: ''
    })


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
            case 'actions':
                return (
                    <>
                        <div className='flex gap-2 justify-center'>
                            <Button onClick={() => {
                                setSelectedItem(row)
                                edit.onOpen()
                            }} isIconOnly value='solid' color='primary'><i><MdEdit/></i></Button>
                            <Button onClick={() => {
                                setSelectedItem(row)
                                confirm.onOpen()
                            }} isIconOnly variant='solid' color='danger'><i><MdDelete/></i></Button>
                        </div>
                    </>
                )
            default:
                return cellValue
        }
    }, [])

    return (
        <>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.label} align={column.key === "actions" ? "center" : "start"}>
                    {column.label}
                    </TableColumn>
                )}
                </TableHeader>
                <TableBody items={data}>
                {(item) => (
                    <TableRow key={item.title}>
                    {(columnKey) => <TableCell>{renderCell(item, columns.filter(el => el.label == columnKey).at(0)?.key)}</TableCell>}
                    </TableRow>
                )}
                </TableBody>
            </Table>
            <EditDishModal isOpen={edit.isOpen} onOpenChange={edit.onOpenChange} data={selectedItem} title={selectedItem.title}/>
            <DeleteConfirm isOpen={confirm.isOpen} function={() => deleteDish(keycloak.token, selectedItem.id, categoryId, updateData)} onOpenChange={confirm.onOpenChange} title={`удалить блюдо`}/>
        </>
    )
}
export default DishTable