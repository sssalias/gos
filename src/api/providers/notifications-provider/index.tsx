import { ReactNode, useEffect } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { onMessage } from 'firebase/messaging'
import { messaging, requestPermission } from 'src/firabse'
import { useUserStore } from 'src/store/user'
import useSound from 'use-sound'

import sound from 'src/assets/sound.mp3'
import { useAppealsStore } from 'src/store/appeals'
import { useOrdersStore } from 'src/store/orders'
import AppealsService from 'src/api/services/AppealsService'
import OrdersService from 'src/api/services/OrdersService'

type PropsType = {
    children: ReactNode
}

const Toast = ({title, body}: any) => {
    const [play] = useSound(sound, {volume: 0.1})
    play()
    return (
            <div>
                <h2>{title}</h2>
                <p>{body}</p>
            </div>
    )
}

const NotificationsProvider = ({children}:PropsType) => {

    const {token} = useUserStore()
    
    // appeals
    const updateAppeals = useAppealsStore(state => state.setData)
    // orders
    const updateOrders = useOrdersStore(state => state.setData)

    const updateData = async () => {
        const resAppeals = await AppealsService.get(token)
        const resOrders = await OrdersService.get(token)
        updateAppeals(resAppeals.data)
        updateOrders(resOrders.data)
    } 

    useEffect(() => {
        if (token.length !== 0) {
            requestPermission(token)
            onMessage(messaging, (payload) => {
                toast.info(<Toast title={payload.notification?.title} body={payload.notification?.body} />, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    })
            })
            updateData()
        }
      }, [token])
    return (
        <>
            <ToastContainer limit={6}/>
            {children}
        </>
    )
}

export default NotificationsProvider