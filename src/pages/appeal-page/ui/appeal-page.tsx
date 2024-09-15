import { MainLayout } from 'src/layout'
import { AppealList } from 'src/widgets/appeal-list'

const AppealPage: React.FC = () => {
    return (
        <MainLayout title='Обращения'>
            <AppealList/>
        </MainLayout>
    )
}
export default AppealPage