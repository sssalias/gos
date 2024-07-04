import SideItem from 'src/components/molecules/side-item'
import classes from './style.module.css'

import Logo from 'src/components/atoms/logo'
import UnderSideItem from 'src/components/molecules/under-side-item'


import orders from 'src/assets/icons/orders.svg'
import comments from 'src/assets/icons/comments.svg'
import menu from 'src/assets/icons/menu.svg'
import newspaper from 'src/assets/icons/newspaper.svg'

import { useMenuStore } from 'src/store/menu'
import { useEffect } from 'react'
import { useUserStore } from 'src/store/user'
import MenuService from 'src/api/services/MenuService'
import { useAppealsStore } from 'src/store/appeals'
import { useOrdersStore } from 'src/store/orders'


const Side = () => {

    const {setData} = useMenuStore()
    const {token} = useUserStore()
    // appeals notifications
    const appealsNotifications = useAppealsStore(state => state.notifications)
    const setAppealsNotifications = useAppealsStore(state => state.setNotifications)
    // orders notifications 
    const ordersNotifications = useOrdersStore(state => state.notifications)
    const setOrdersNotifications = useOrdersStore(state => state.setNotifications)
    useEffect(() => {
        const get = async () => {
          if (token.length !== 0) {
            const {data} = await MenuService.get(token)
            setData(data)
            
          }
        }
        get()
    }, [token])

    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
            <Logo/>
            <UnderSideItem icon={menu}/>
            <SideItem link='orders' event={() => setOrdersNotifications(0)} notifications={ordersNotifications} icon={orders}>ЗАКАЗЫ</SideItem>
            <SideItem link='appeals' event={() => setAppealsNotifications(0)} notifications={appealsNotifications} icon={comments}>ОБРАЩЕНИЯ</SideItem>
            <SideItem link='news' icon={newspaper}>НОВОСТИ</SideItem>
        </div>
      </div>
    )
}

export default Side