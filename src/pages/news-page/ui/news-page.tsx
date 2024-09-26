import { MainLayout } from 'src/layout'
import { NewsList } from 'src/widgets/news-list'

const NewsPage: React.FC = () => {
    return (
        <MainLayout title='Новости'>
            <NewsList/>
        </MainLayout>
    )
}
export default NewsPage