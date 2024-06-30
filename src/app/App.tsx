import './App.base.css'
import './App.style.scss'

import MenuPage from 'src/components/pages/menu-page'
import OrdersPage from 'src/components/pages/orders-page'
import AppealsPage from 'src/components/pages/appeals-page'
import { Route, Routes } from 'react-router-dom'
import NewsPage from 'src/components/pages/news-page'

const App = () => {

    const paths = [
      {path: '/*', element: <MenuPage/>, index: true},
      {path: '/orders', element: <OrdersPage/>, index: false},
      {path: '/appeals', element: <AppealsPage/>, index: false},
      {path: '/news', element: <NewsPage/>, index: false},
    ]
    
    return (
      <>
        <Routes>
          {paths.map(({path, element, index}) => <Route index={index} path={path} element={element} key={path}/>)}
        </Routes>
      </>
    )
}

export default App