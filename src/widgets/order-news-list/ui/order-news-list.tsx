import { useKeycloak } from '@react-keycloak/web'
import { useEffect } from 'react'
import { OrderNewsItem } from 'src/entities/order'
import { usePersonalNewsStore } from 'src/store/personal-news'
import { getOrderNews } from 'src/widgets/order-news-list/api/getOrderNews'

type Props = {
    userId: string
}
const OrderNewsList: React.FC<Props> = props => {

    const {keycloak} = useKeycloak()
    const {setData, data} = usePersonalNewsStore()

    useEffect(() => {
        const get = async () => {
            if (keycloak.token) {
                const {data} = await getOrderNews(keycloak.token)
                setData(data.filter(el => el.forUserId === props.userId))
            }
        }
        get()
    }, [keycloak.token, props.userId, setData])

    return (
        <div className='flex flex-col gap-2'>
            {data.map(el => <OrderNewsItem title={el.title} body={el.body}/>)}
        </div>
    )
}
export default OrderNewsList