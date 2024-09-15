import { Button, useDisclosure } from '@nextui-org/react'
import { PiPlus } from 'react-icons/pi'
import NewsCreateModal from 'src/entities/news/ui/news-create-modal'

const NewsCreate: React.FC = () => {
    const {isOpen, onOpenChange, onOpen} = useDisclosure()
    return (
        <>
            <Button onPress={onOpen} variant='light' color='default' isIconOnly className='w-full p-5'>
                <i><PiPlus/></i>
            </Button>
            <NewsCreateModal isOpen={isOpen} onOpenChange={onOpenChange}/>
        </>
    )
}
export default NewsCreate