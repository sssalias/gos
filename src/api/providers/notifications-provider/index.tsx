import { ReactNode, useEffect } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { onMessage } from 'firebase/messaging'
import { messaging, requestPermission } from 'src/firabse'
import { useUserStore } from 'src/store/user'
type PropsType = {
    children: ReactNode
}

const NotificationsProvider = ({children}:PropsType) => {

    const audio = new Audio('src/assets/sound.mp3')
    const {token} = useUserStore()

    useEffect(() => {
        if (token.length !== 0) {
            requestPermission(token)
            onMessage(messaging, (payload) => {
                audio.play()
                toast.info(<div>
                    <h2>{payload.notification?.title}</h2>
                    <p>{payload.notification?.body}</p>
                </div>, {
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