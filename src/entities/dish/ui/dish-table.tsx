import { Button, Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useCallback } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { columns } from 'src/entities/dish/libs'

const DishTable: React.FC = () => {

    const renderCell = useCallback((row, key) => {
        const cellValue = row[key]

        console.log(row.key, key)
        
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
                    <div className='flex gap-2 justify-center'>
                        <Button isIconOnly variant='solid' color='danger'><i><MdDelete/></i></Button>
                        <Button isIconOnly value='solid' color='primary'><i><MdEdit/></i></Button>
                    </div>
                )
            default:
                return cellValue
        }
    }, [])

    return (
        <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.label} align={column.key === "actions" ? "center" : "start"}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={[{photoId: '', title: 'FFFF', price: 2000, cookingTime: 20, calories: 0, fats: 0, proteins: 0, carbohydrates: 0, actions: null}]}>
          {(item) => (
            <TableRow key={item.title}>
              {(columnKey) => <TableCell>{renderCell(item, columns.filter(el => el.label == columnKey).at(0)?.key)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
}
export default DishTable