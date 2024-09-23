import { IoFastFoodSharp } from 'react-icons/io5'
import { GoDotFill } from 'react-icons/go'
import { ImNewspaper } from 'react-icons/im'
import { FaClipboardList, FaCommentDots, FaHome } from 'react-icons/fa'

interface INavItem {
    path: string
    text: string
    icon?: React.ReactNode
    subItems?: INavItem[],
    add?: boolean
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
        ],
        add: true
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


export const getNavigation = (data:any[]) => {
    navigation.forEach(nav => {
        if (nav.subItems) {
            nav.subItems = data.map((el):INavItem => {return {path: '/menu/' + el.id, icon: <GoDotFill />, text: el.type}})
        }
    })
    return navigation
} 