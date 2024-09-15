import { Routes, Route } from 'react-router-dom'
import { HomePage } from 'src/pages/home-page'


export interface IRoute {
    path: string
    page: React.ReactNode
}

export const RouterData: IRoute[] = [
    {
        path: '/',
        page: <HomePage/>
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