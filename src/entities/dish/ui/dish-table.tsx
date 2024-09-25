import { Button, Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useCallback, useEffect } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { deleteDish } from 'src/entities/dish/api'
import { columns } from 'src/entities/dish/libs'
import { DeleteConfirm } from 'src/shared/ui'
import { useDishesStore } from 'src/store/dishes'

const DishTable: React.FC = () => {
    
    const {keycloak} = useKeycloak()

    const {data} = useDishesStore()

    const confirm = useDisclosure()

    const renderCell = (row, key) => {
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
                    <h2 className='text-red-400'>{cellValue}</h2>
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
                            <Button isIconOnly value='solid' color='primary'><i><MdEdit/></i></Button>
                            <Button onClick={confirm.onOpen} isIconOnly variant='solid' color='danger'><i><MdDelete/></i></Button>
                        </div>
                    </>
                )
            default:
                console.log('asfasf');
                return cellValue
        }
    }

    return (
        <>
            <DeleteConfirm isOpen={confirm.isOpen} onOpenChange={confirm.onOpenChange} title={`удалить блюдо`}/>
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
        </>
    )
}
export default DishTable