import { ClearMenu } from 'src/features/clear-menu'
import { ImportMenu } from 'src/features/import'
import { MainLayout } from 'src/layout'
import { CategoryList } from 'src/widgets/category-list'

const MenuPage: React.FC = () => {
    return (
        <MainLayout title='Категории меню'>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <ImportMenu/>
                    <ClearMenu/>
                </div>
                <CategoryList/>
            </div>
        </MainLayout>
    )
}
export default MenuPage