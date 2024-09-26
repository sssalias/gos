import { MainLayout } from 'src/layout'
import { HomeGreet } from 'src/widgets/home-greet'

const HomePage: React.FC = () => {
    return (
        <MainLayout title='Главная'>
            <HomeGreet/>
        </MainLayout>
    )
}
export default HomePage