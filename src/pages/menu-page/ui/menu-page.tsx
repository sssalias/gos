import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MainLayout } from 'src/layout'
import { CategoryList } from 'src/widgets/category-list'
// import { CategoryList } from 'src/widgets/category-list'

const MenuPage: React.FC = () => {

    const {id} = useParams()
    
    useEffect(() => {
        console.log(id)
    }, [id])

    return (
        <MainLayout title='Категории меню'>
            <CategoryList/>
        </MainLayout>
    )
}
export default MenuPage