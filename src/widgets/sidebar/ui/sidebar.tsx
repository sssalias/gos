import { Link } from 'react-router-dom'

// icons
import { RiLogoutBoxFill } from 'react-icons/ri'
import { DeleteConfirm, Logo } from 'src/shared/ui'
import clsx from 'clsx'
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa'
import { useKeycloak } from '@react-keycloak/web'
import { Button, useDisclosure } from '@nextui-org/react'
import { useSideStore } from 'src/store/side'
import { CreateMenuModal } from 'src/entities/menu'
import { getMenu, getNavigation } from 'src/widgets/sidebar/api'
import { useMenuStore } from 'src/store/menu'
import { useEffect } from 'react'


const SideBar: React.FC = () => {


    const {keycloak} = useKeycloak()
    const {setData, data} = useMenuStore()

    useEffect(() => {
        if (keycloak.token) {
            getMenu(keycloak.token, setData)
        }
    }, [keycloak.token])
    
    const confirm = useDisclosure()
    const menu = useDisclosure()

    const {isOpen, setOpen, isSmall, setSmall} = useSideStore()
    const navigation = getNavigation(data)
    return (
        <>
            <aside className={clsx(
                !isSmall ? 'w-[250px]' : 'w-[75px]', 
                'fixed h-[calc(100vh-40px)] transition-size bg-main-blue rounded-2xl z-[15]',
                'max-sm:invisible'
            )}>
                <div className='h-full w-3/4 mx-auto'>
                    <div className='h-full py-6 flex flex-col justify-between items-center gap-4'>
                        {/* brand */}
                        <div>
                            <Logo small={isSmall}/>
                        </div>
                        {/* content */}
                        <div className='w-full h-full relative'>
                            <Button onPress={() => setSmall(!isSmall)} className='absolute top-[-35px] right-[-45px]' isIconOnly variant='solid' color='primary' size='sm'>
                                <i>{!isSmall ? <FaArrowLeft/> : <FaArrowRight/>}</i>
                            </Button>
                            <nav className='h-full'>
                                <ul className='h-full flex flex-col items-start text-white'>
                                    {navigation.map(el => {
                                            if (!el.subItems) {
                                                return (
                                                    <li key={el.text} className='text-base w-full rounded-xl uppercase transition-all hover:bg-blue-500'>
                                                        <Link to={el.path} className='flex items-center gap-4 py-4 px-5 w-full'>
                                                            <i>{el.icon}</i>
                                                            <span className='font-semibold'>{!isSmall ? el.text : null}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                            return (
                                                <>
                                                    <li onClick={!isSmall ? () => setOpen(!isOpen): () => setSmall(!isSmall)} key={el.text} className='flex justify-between items-center cursor-pointer py-4 px-5 w-full uppercase'>
                                                        <div className='flex items-center gap-4'>
                                                            <i>{el.icon}</i>
                                                            <span className='font-semibold'>{!isSmall ? el.text : null}</span>
                                                        </div>
                                                        <button>
                                                            {!isSmall ? <i>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</i> : null}
                                                        </button>
                                                    </li>
                                                    {
                                                        !isSmall
                                                        ?
                                                        <div className={clsx('pl-5 w-full transition-all overflow-y-hidden', isOpen ? 'max-h-[800px]' : 'max-h-0')}>
                                                            {el.subItems.map(subEl => (
                                                                <li key={subEl.text} className='text-base w-full rounded-xl uppercase transition-all hover:bg-blue-500'>
                                                                    <Link to={subEl.path} className='flex items-center gap-4 py-4 px-5 w-full'>
                                                                        <i>{subEl.icon}</i>
                                                                        <span className='font-semibold'>{subEl.text}</span>
                                                                    </Link>
                                                                </li>                                                         
                                                            ))}
                                                            {
                                                                el.add && data.length < 2
                                                                ?
                                                                <li 
                                                                    onClick={menu.onOpen}
                                                                    className='flex justify-center items-center cursor-pointer py-4 px-5 text-base w-full rounded-xl uppercase transition-all hover:bg-blue-500'>
                                                                    <FaPlus/>
                                                                </li>
                                                                :
                                                                null
                                                            }                                           
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                </>
                                            )
                                        }
                                    )}
                                    <li key={'logOut'} className='text-base w-full border-[1px] border-solid border-primary-grey mt-auto rounded-xl'>
                                        <button onClick={confirm.onOpen} className='flex items-center gap-4 py-4 px-5 w-full text-primary-grey'>
                                            <i><RiLogoutBoxFill/></i>
                                            <span className='font-semibold uppercase'>{!isSmall ? 'Выйти' : null}</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        
                    </div>
                </div>
            </aside>
            <DeleteConfirm title='выйти' isOpen={confirm.isOpen} onOpenChange={confirm.onOpenChange} function={keycloak.logout}/>
            <CreateMenuModal isOpen={menu.isOpen} onOpenChange={menu.onOpenChange}/>
        </>
    )
}
export default SideBar