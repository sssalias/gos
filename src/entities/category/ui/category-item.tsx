import { Button, Card, CardBody, CardHeader, useDisclosure } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { MdDelete } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCategory } from 'src/entities/category/api'
import { DeleteConfirm } from 'src/shared/ui'
import { useCategoriesStore } from 'src/store/categories'

type Props = {
    id: string
    title: string
}
const CategoryItem: React.FC<Props> = props => {

    const confirm = useDisclosure()
    const {keycloak} = useKeycloak()
    const {updateData} = useCategoriesStore()
    const {id} = useParams()
    const nav = useNavigate()

    return (
        <>
            <Card shadow='sm'>
                <CardHeader className='flex justify-end absolute'>
                    <Button
                        onPress={confirm.onOpen}
                        isIconOnly
                        variant='light'
                        color='danger'
                    >
                        <i><MdDelete/></i>
                    </Button>
                </CardHeader>
                <CardBody className='flex flex-col items-center justify-center gap-5 py-8 cursor-pointer hover:shadow-lg'>
                    <h2 className='font-semibold text-2xl'>{props.title}</h2>
                    {/* <Link  to={`${props.id + '/' + props.title}`}> */}
                        <Button onClick={() => nav(`${props.id + '/' + props.title}`)} variant='bordered' color='primary'>Подробнее</Button>
                    {/* </Link> */}
                </CardBody>
            </Card>
            <DeleteConfirm title='удалить эту категорию' isOpen={confirm.isOpen} onOpenChange={confirm.onOpenChange} function={() => deleteCategory(keycloak.token, props.id, id, updateData)}/>
        </>
    )
}
export default CategoryItem