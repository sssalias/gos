import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from '@nextui-org/react'
import { columns } from 'src/widgets/order-table/libs';

const rows = []


const OrderTable = () => {
    return (
        <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                <TableRow key={item.key}>
                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
        </Table>
    ) 
}

export default OrderTable