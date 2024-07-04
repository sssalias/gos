import { useOrdersStore } from 'src/store/orders'

export const useOrdersNotifications = () => {

    const {notifications, setNotifications} = useOrdersStore()

    useOrdersStore.subscribe((current, prev) => {
        if (current.data.length - prev.data.length === 1) {
          setNotifications(notifications + 1)
        }
      })
}