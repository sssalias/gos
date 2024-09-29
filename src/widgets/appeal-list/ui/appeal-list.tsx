import { Select, SelectItem } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useEffect } from 'react'
import { AppealItem } from 'src/entities/appeal'
import { ListLayout } from 'src/layout/ui'
import { AppealsService } from 'src/shared/api'
import { useAppealsStore } from 'src/store/appeals'
import { getUserData } from 'src/widgets/header/api'

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

    
    const user = getUserData(keycloak.token)

    return (
        <ListLayout dataCount={data.length}>
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
                    .filter(el => user?.role === 'Администратор' ? el : el.ownerRole.toLowerCase() !== 'vip' && el.ownerRole.toLowerCase() !== 'super_vip')
                    .reverse()
                    .map(el => <AppealItem comments={el.comments} ownerRole={el.ownerRoles[0]}  photoId={el.photoId} status={el.status} id={el.id} key={el.id} number={el.number} ownerEmail={el.ownerEmail} body={el.body}/>)
            }
        </ListLayout>
    )
}
export default AppealList