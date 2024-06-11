import React, {useEffect, useState} from 'react';
import BaseLayout from "../../layout/BaseLayout";
import {Route, Routes} from "react-router-dom";
import MenuService from "../../../services/MenuService";
import Category from "./Category/Category";
import ProtectedRoute from "../../../auth/ProtectedRoute";
import {useKeycloak} from "@react-keycloak/web";
import {getFile, getFormData} from "../../../utils/formData";

const MenuPage = (props) => {


    const {keycloak, initialized} = useKeycloak()

    const [menu, setMenu] = useState([])

    const [file, setFile] = useState(null)

    console.log(file)


    useEffect(() => {
        if (initialized) {
            getMenu()
        }
    }, [setMenu, initialized])

    const getMenu = () => {
        MenuService.getMenu(keycloak.token)
            .then(res => setMenu(res.data))
            .catch(err => err)
    }

    return (
        <BaseLayout>
            <Routes>
                {menu.map((el) => <Route key={el.id} path={el.id} element={<Category menu={el} meny key={el.id} title={el.title} id={el.id} />} />)}
            </Routes>
        </BaseLayout>
    );
};

export default MenuPage;