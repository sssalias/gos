import { useCategoriesStore } from 'src/store/categories'
import classes from './style.module.css'
import CategoriesItem from 'src/components/molecules/category-item'
import CreateCategoryItem from 'src/components/molecules/create-category-item'

const CategoriesList = () => {

    const {data} = useCategoriesStore()


    return (
      <div className={classes.container}>
        {data.map((el) => <CategoriesItem key={el.id} data={el} />)}
        <CreateCategoryItem/>
      </div>
    )
}

export default CategoriesList