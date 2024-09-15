import { Select, SelectItem } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useEffect } from 'react'
import { AppealItem } from 'src/entities/appeal'
import { AppealsService } from 'src/shared/api'
import { useAppealsStore } from 'src/store/appeals'

const AppealList: React.FC = () => {

    const {keycloak, initialized} = useKeycloak()
    const {setData, data} = useAppealsStore()
    const {filters, setFilters} = useAppealsStore()

    

    useEffect(() => {
        const get = async () => {
            if (keycloak.token) {
                const {data} = await AppealsService.get(keycloak.token)
                setData(data)
            }
        }
        get()
    }, [initialized])

    

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-4'>
                <Select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} label="Статус">
                    <SelectItem key='ВСЕ'>ВСЕ</SelectItem>
                    <SelectItem key='NEW'>NEW</SelectItem>
                    <SelectItem key='Принято'>Принято</SelectItem>
                    <SelectItem key='Отклонено'>Отклонено</SelectItem>
                </Select>
                <Select value={filters.ownerRole} onChange={e => setFilters({...filters, ownerRole: e.target.value})} label="Роль">
                    <SelectItem key='user'>user</SelectItem>
                    <SelectItem key='vip'>vip</SelectItem>
                    <SelectItem key='super_vip'>super_vip</SelectItem>
                </Select>
            </div>
            { 
                data
                    .filter(el => filters.status !== 'ВСЕ' ? el.status === filters.status : el)
                    .filter(el =>  el.ownerRoles.includes(filters.ownerRole))
                    .reverse()
                    .map(el => <AppealItem comments={el.comments} ownerRole={el.ownerRoles[0]}  photoId={el.photoId} status={el.status} id={el.id} key={el.id} number={el.number} ownerEmail={el.ownerEmail} body={el.body}/>)
            }
        </div>
    )
}
export default AppealList