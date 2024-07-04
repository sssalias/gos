import { ReactNode } from 'react'
import { useAppealsNotifications } from 'src/api/hooks/useAppealsNotifications'
import { useOrdersNotifications } from 'src/api/hooks/useOrdersNotifications'

type PropsType = {
    children: ReactNode
}

const NotificationsProvider = ({children}:PropsType) => {

    useOrdersNotifications()
    useAppealsNotifications()

    return (
        <>
            {children}
        </>
    )
}

export default NotificationsProvider