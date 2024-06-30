import GroupNewsItem from 'src/components/molecules/group-news-item'
import classes from './style.module.scss'
import CreateGroupNewsItem from 'src/components/molecules/create-group-news-item'
import { useNewsStore } from 'src/store/news'
import { useState } from 'react'

const GroupNewsList = () => {

    const {data} = useNewsStore()

    const [filter, setFilter] = useState('all')
    
    return (
        <div className={classes.container}>
            <div>
                <span>Категория пользователей: </span>
                <select value={filter} onChange={e => setFilter(e.target.value)}>
                    <option value="all">ВСЕ</option>
                    <option value="user">Пользователь</option>
                    <option value="vip">VIP</option>
                    <option value="super_vip">SUPER_VIP</option>
                </select>
            </div>
            <CreateGroupNewsItem/>
            {data
                .filter(el => filter !== 'all' ? el.forUserTypes === filter : el)
                .map(el => <GroupNewsItem title={el.title} body={el.body} data={el}/>)}
        </div>
    )
}

export default GroupNewsList