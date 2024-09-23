import { Card, CardBody, useDisclosure } from '@nextui-org/react'
import { PiPlus } from 'react-icons/pi'
import CreateCategoryModal from 'src/entities/category/ui/create-category-modal'

const CreateCategoryItem: React.FC = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    return (
        <>
            <Card shadow='sm'>
                <CardBody onClick={onOpen} className='flex items-center justify-center py-12 cursor-pointer hover:shadow-lg'>
                    <i><PiPlus/></i>
                </CardBody>
            </Card>
            <CreateCategoryModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
        </>
    )
}
export default CreateCategoryItem