import { Link } from 'react-router-dom'

// icons
import { RiLogoutBoxFill } from 'react-icons/ri'
import { IoFastFoodSharp } from 'react-icons/io5'
import { Logo } from 'src/shared/ui'
import clsx from 'clsx'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaClipboardList, FaCommentDots, FaHome } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { ImNewspaper } from 'react-icons/im'
import { useKeycloak } from '@react-keycloak/web'


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

const SideBar: React.FC = () => {

    const [active, setActive] = useState(false)

    const {keycloak} = useKeycloak()

    return (
        <aside className='fixed w-[250px] h-[calc(100vh-40px)] bg-main-blue rounded-2xl z-[15]'>
            <div className='h-full w-3/4 mx-auto'>
                <div className='h-full py-6 flex flex-col justify-between items-center gap-4'>
                    {/* brand */}
                    <div>
                        <Logo/>
                    </div>
                    {/* content */}
                    <div className='w-full h-full'>
                        <nav className='h-full'>
                            <ul className='h-full flex flex-col items-start text-white'>
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
                                                <li key={el.text} className='flex justify-between items-center py-4 px-5 w-full uppercase'>
                                                    <div className='flex items-center gap-4'>
                                                        <i>{el.icon}</i>
                                                        <span className='font-semibold'>{el.text}</span>
                                                    </div>
                                                    <button onClick={() => setActive(!active)}>
                                                        <i>{active ? <FaChevronUp /> : <FaChevronDown />}</i>
                                                    </button>
                                                </li>
                                                <div className={clsx('pl-5 w-full transition-all overflow-y-hidden', active ? 'max-h-[500px]' : 'max-h-0')}>
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
                                    }
                                )}
                                <li key={'logOut'} className='text-base w-full border-[1px] border-solid border-primary-grey mt-auto rounded-xl'>
                                    <button onClick={() => keycloak.logout()} className='flex items-center gap-4 py-4 px-5 w-full text-primary-grey'>
                                        <i><RiLogoutBoxFill/></i>
                                        <span className='font-semibold uppercase'>Выйти</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    
                </div>
            </div>
        </aside>
    )
}
export default SideBar