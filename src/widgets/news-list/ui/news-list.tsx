import { useKeycloak } from '@react-keycloak/web'
import { NewsCreate } from 'src/entities/news'
import { useEffect, useState } from 'react'
import NewsItem from 'src/entities/news/ui/news-item'
import { NewsService } from 'src/shared/api'
import { useNewsStore } from 'src/store/news'
import { Select, SelectItem } from '@nextui-org/react'
import { ListLayout } from 'src/layout/ui'

const NewsList: React.FC = () => {


    const {keycloak, initialized} = useKeycloak()
    const {data, setData} = useNewsStore()

    const [filter, setFilter] = useState('all')

    useEffect(() => {   
        const getData = async () => {
            if (keycloak.token) {
                const {data} = await NewsService.getForGroup(keycloak.token)
                setData(data)
            }
        }
    
         getData()
    }, [initialized])

    return (
        <ListLayout dataCount={data.length}>
            <Select label='Группа пользователей' value={filter} onChange={e => setFilter(e.target.value)}>
                <SelectItem value='all' key='all'>ВСЕ</SelectItem>
                <SelectItem value='vip' key='vip'>vip</SelectItem>
                <SelectItem value='super_vip' key='super_vip'>super_vip</SelectItem>
            </Select>
            <NewsCreate/>
            {data
                .filter(el => filter !== 'all' ? el.forUserTypes === filter : el)
                .map(el => <NewsItem id={el.id} title={el.title} body={el.body} forUserTypes={el.forUserTypes} photoIds={el.photoIds}/>)
                .reverse()    
            }
        </ListLayout>
    )
}
export default NewsList