import { useEffect } from 'react'
import AppealsService from 'src/api/services/AppealsService'
import AppealsList from 'src/components/organisms/appeals-list'
import BaseTemplate from 'src/components/templates/base-template'
import { useAppealsStore } from 'src/store/appeals'
import { useUserStore } from 'src/store/user'

const AppealsPage = () => {

    const {token} = useUserStore()
    const {setData} = useAppealsStore()

    useEffect(() => {
      const getData = async () => {  
        const {data} = await AppealsService.get(token)
        setData(data)
      }

      if (token.length !== 0) {
        getData()
        setInterval(() => {
          getData()
        }, 5000)
      }
    }, [token])

    return (
      <BaseTemplate>
        <h1>Обращения</h1>
        <AppealsList/>
      </BaseTemplate>
    )
}

export default AppealsPage