import { useEffect } from 'react'
import { useAppealsStore } from 'src/store/appeals'
import { useUserStore } from 'src/store/user'
import AppealsService from '../services/AppealsService'

export const useAppealsPulling = () => {
    const {token} = useUserStore()
    const {setData} = useAppealsStore()

    useEffect(() => {
      const getData = async () => {  
        const res = await AppealsService.get(token)  
        setData(res.data)
      }

      if (token.length !== 0) {
        getData()
        // setInterval(() => {
        //   getData()
        // }, 5000)
      }
    }, [token])
        
}