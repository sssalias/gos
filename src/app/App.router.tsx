import { Routes, Route } from 'react-router-dom'
import { AppealPage } from 'src/pages/appeal-page'
import { DishPage } from 'src/pages/dish-page'
import { ErrorPage } from 'src/pages/error-page'
import { HomePage } from 'src/pages/home-page'
import { LoadingPage } from 'src/pages/loading-page'
import MenuPage from 'src/pages/menu-page/ui/menu-page'
import { NewsPage } from 'src/pages/news-page'
import { OrderPage } from 'src/pages/order-page'


interface IRoute {
    path: string
    page: React.ReactNode
}

const RouterData: IRoute[] = [
    {
        path: '/',
        page: <HomePage/>
    },
    {
        path: '/menu/:id',
        page: <MenuPage/>
    },
    {
        path: '/menu/:id/:categoryId/:title',
        page: <DishPage/>
    },
    {
        path: '/orders',
        page: <OrderPage/>
    },
    {
        path: '/appeals',
        page: <AppealPage/>
    },
    {
        path: '/news',
        page: <NewsPage/>
    },
    {
        path: '/loading',
        page: <LoadingPage/>
    },
    {
        path: '*',
        page: <ErrorPage/>
    }
]

const AppRouter: React.FC = () => {
    return (
        <Routes>
            {RouterData.map(el => <Route key={el.path} path={el.path} element={el.page}/>)}
        </Routes>
    )
}
export default AppRouter