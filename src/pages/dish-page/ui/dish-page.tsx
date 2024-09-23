import { useParams } from 'react-router-dom'
import { DishTable } from 'src/entities/dish'
import { MainLayout } from 'src/layout'

const DishPage: React.FC = () => {

    const {id, title, categoryId} = useParams()

    console.log(id, categoryId)
    
    return (
        <MainLayout title={'Блюда категории ' + title}>
            <DishTable/>
        </MainLayout>
    )
}
export default DishPage