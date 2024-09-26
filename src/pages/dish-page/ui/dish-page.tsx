import { useKeycloak } from '@react-keycloak/web'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CreateDishItem, DishTable, getDish } from 'src/entities/dish'
import { MainLayout } from 'src/layout'
import { ListLayout } from 'src/layout/ui'
import { useDishesStore } from 'src/store/dishes'

const DishPage: React.FC = () => {

    const {title, categoryId} = useParams()

    const {keycloak} = useKeycloak()
    const {setData} = useDishesStore()

    useEffect(() => {
        getDish(keycloak.token, categoryId, setData)
    }, [categoryId, keycloak.token])
    
    return (
        <MainLayout title={'Блюда категории ' + title}>
            <ListLayout>
                <CreateDishItem/>
                <DishTable/>
            </ListLayout>
        </MainLayout>
    )
}
export default DishPage