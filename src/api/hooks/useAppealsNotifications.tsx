import { useAppealsStore } from 'src/store/appeals'

export const useAppealsNotifications = () => {

    const {notifications, setNotifications} = useAppealsStore()

    useAppealsStore.subscribe((state, prev) => {
        if (state.data.length - prev.data.length === 1) {
          setNotifications(notifications + 1)
        } 
        
      })
}