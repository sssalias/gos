import { Button, useDisclosure } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { MdDelete } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { clearMenu } from 'src/features/clear-menu/api'
import { DeleteConfirm } from 'src/shared/ui'
import { useCategoriesStore } from 'src/store/categories'

const ClearMenu: React.FC = () => {

    const {keycloak} = useKeycloak()
    const {id} = useParams()
    const {updateData} = useCategoriesStore()

    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    return (
        <>
            <Button onPress={onOpen} isIconOnly color='danger' variant='solid'><i><MdDelete/></i></Button>
            <DeleteConfirm title='очистить меню' function={() => clearMenu(keycloak.token, id, updateData)} isOpen={isOpen} onOpenChange={onOpenChange}/>
        </>
    )
}
export default ClearMenu