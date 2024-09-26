import { Button, useDisclosure } from '@nextui-org/react'
import { PiPlus } from 'react-icons/pi'
import CreateDishModal from 'src/entities/dish/ui/create-dish-modal'

const CreateDishItem: React.FC = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    return (
        <>
            <Button onPress={onOpen} className='w-full' variant='faded' color='default' isIconOnly>
                <PiPlus/>
            </Button>
            <CreateDishModal isOpen={isOpen} onOpenChange={onOpenChange}/>
        </>
    )
}
export default CreateDishItem