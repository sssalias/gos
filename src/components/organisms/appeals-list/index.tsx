import { useAppealsStore } from 'src/store/appeals'
import classes from './style.module.css'
import AppealsItem from 'src/components/molecules/appeals-item'

const AppealsList = () => {


    const {data} = useAppealsStore()
    const {filters, setFilters} = useAppealsStore()


    return (
        <div className={classes.container}>

            <div style={{display: 'flex', justifyContent: 'center', gap: 10}}>
                    <h4>Статус:</h4>
                    <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
                        <option value="ВСЕ">ВСЕ</option>
                        <option value="NEW">NEW</option>
                        <option value="Принято">Принято</option>
                        <option value="Отклонено">Отклонено</option>
                    </select>
                    <h4>Роль автора:</h4>
                    <select value={filters.ownerRole} onChange={e => setFilters({...filters, ownerRole: e.target.value})}>
                        <option value="user">ВСЕ</option>
                        <option value="vip">VIP</option>
                        <option value="super_vip">SUPER VIP</option>
                    </select>
                </div>

            {
                data
                    .filter(el => filters.status !== 'ВСЕ' ? el.status === filters.status : el)
                    .filter(el =>  el.ownerRoles.includes(filters.ownerRole))
                    .reverse()
                    .map(el => <AppealsItem comments={el.comments} ownerRole={el.ownerRoles[0]}  photoId={el.photoId} status={el.status} id={el.id} key={el.id} number={el.number} ownerEmail={el.ownerEmail} body={el.body}/>)
            }
        </div>
    )
}

export default AppealsList