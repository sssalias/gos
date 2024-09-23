import { useKeycloak } from '@react-keycloak/web'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CategoryItem } from 'src/entities/category'
import CreateCategoryItem from 'src/entities/category/ui/create-category-item'
import { useCategoriesStore } from 'src/store/categories'
import { getCategory } from 'src/widgets/category-list/api/getCategory'

const CategoryList: React.FC = () => {

    const {id} = useParams()
    const {keycloak} = useKeycloak()
    const {data, setData} = useCategoriesStore()

    useEffect(() => {
        getCategory(id, keycloak.token, setData)
    }, [keycloak.token, id])

    console.log(data);
    

    return (
        <div className='grid grid-cols-4 gap-4'>
            <CreateCategoryItem/>
            {data.map(el => <CategoryItem title={el.title} id={el.id}/>)}
        </div>
    )
}
export default CategoryList