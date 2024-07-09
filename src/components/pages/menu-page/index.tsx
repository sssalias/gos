import { Route, Routes } from 'react-router-dom'
import MenuItem from 'src/components/organisms/menu-item'
import BaseTemplate from 'src/components/templates/base-template'
import { useMenuStore } from 'src/store/menu'

const MenuPage = () => {
    const {data} = useMenuStore()
    return (
      <BaseTemplate>
          <Routes>
                {data.map((el) => <Route key={el.id} path={el.id} element={<MenuItem dateTo={el.dateTo} menu={el} key={el.id} title={el.title} id={el.id} />} />)}
            </Routes>
      </BaseTemplate>
    )
}

export default MenuPage