import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import clsx from 'clsx'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaClipboardList, FaCommentDots, FaHome } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { ImNewspaper } from 'react-icons/im'
import { IoFastFoodSharp, IoMenu } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { Logo } from 'src/shared/ui'

interface INavItem {
    path: string
    text: string
    icon?: React.ReactNode
    subItems?: INavItem[]
}

const navigation: INavItem[] = [
    {
        path: '/',
        text: 'Главная',
        icon: <FaHome />
    },
    {
        path: '/menu',
        text: 'Меню',
        icon: <IoFastFoodSharp />,
        subItems: [
            {
                path: '/menu/safjasfasfas',
                text: 'общее',
                icon: <GoDotFill />
            }
        ]
    },
    {
        path: '/orders',
        text: 'Заказы',
        icon: <FaClipboardList />
    },
    {
        path: '/appeals',
        text: 'Обращения',
        icon: <FaCommentDots />
    },
    {
        path: '/news',
        text: 'Новости',
        icon: <ImNewspaper />
    }
]


const AdaptiveMenu: React.FC = () => {

    const {onOpen, isOpen, onOpenChange} = useDisclosure()

    const [isSubOpen, setSubOpen] = useState(false)

    return (
        <div className='invisible max-sm:visible'>
            <Button onPress={onOpen}>
                <i><IoMenu/></i>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className='flex items-center justify-center'>
                    <ModalHeader>
                        <Logo small/>
                    </ModalHeader>
                    <ModalBody>
                        <div className='w-full flex flex-col gap-2'>
                            <nav className='w-full'>
                                <ul className='w-full '>
                                    <li className='w-full '>
                                        {navigation.map(el => {
                                            if (!el.subItems) {
                                                return (
                                                    <li key={el.text} className='text-base w-full rounded-xl uppercase transition-all hover:bg-blue-500'>                            
                                                        <Link to={el.path} className='flex items-center gap-4 py-4 px-5 w-full'>
                                                            <i>{el.icon}</i>
                                                            <span className='font-semibold'>{el.text}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                            return (
                                                <>
                                                    <li onClick={() => setSubOpen(!isSubOpen)} key={el.text} className='flex justify-between items-center cursor-pointer py-4 px-5 w-full uppercase'>
                                                        <div className='flex items-center gap-4'>
                                                            <i>{el.icon}</i>
                                                            <span className='font-semibold'>{el.text}</span>
                                                        </div>
                                                        <button>
                                                            <i>{isSubOpen ? <FaChevronUp /> : <FaChevronDown />}</i>
                                                        </button>
                                                    </li>
                                                    <div className={clsx('pl-5 w-full transition-all overflow-y-hidden', isSubOpen ? 'max-h-[500px]' : 'max-h-0')}>
                                                        {el.subItems.map(subEl => (
                                                            <li key={subEl.text} className='text-base w-full rounded-xl uppercase transition-all hover:bg-blue-500'>
                                                                    <Link to={subEl.path} className='flex items-center gap-4 py-4 px-5 w-full'>
                                                                    <i>{subEl.icon}</i>
                                                                    <span className='font-semibold'>{subEl.text}</span>
                                                                </Link>
                                                            </li>                                                         
                                                        ))}                                               
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}
export default AdaptiveMenu