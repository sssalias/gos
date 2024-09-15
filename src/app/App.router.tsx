import { Routes, Route } from 'react-router-dom'
import { AppealPage } from 'src/pages/appeal-page'
import { HomePage } from 'src/pages/home-page'
import { NewsPage } from 'src/pages/news-page'
import { OrderPage } from 'src/pages/order-page'


export interface IRoute {
    path: string
    page: React.ReactNode
}

export const RouterData: IRoute[] = [
    {
        path: '/',
        page: <HomePage/>
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