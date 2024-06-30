import { useEffect } from 'react'
import NewsService from 'src/api/services/NewsService'
import GroupNewsList from 'src/components/organisms/group-news-list'
import BaseTemplate from 'src/components/templates/base-template'
import { useNewsStore } from 'src/store/news'
import { useUserStore } from 'src/store/user'

const NewsPage = () => {

    const {token} = useUserStore()
    const {setData} = useNewsStore()

    useEffect(() => {
        const getData = async () => {
            const {data} = await NewsService.getForGroup(token)
            setData(data)
        }

        getData()
    }, [token])

    return (
        <BaseTemplate>
            <h1>Новости</h1>
            <GroupNewsList/>
        </BaseTemplate>
    )
}

export default NewsPage