import React, {useEffect, useState} from 'react';
import CategoriesItem from "./CategoriesItem/CategoriesItem";
import classes from './CategoriesList.module.css'
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";
import CreateCategory from "./CreateCategory/CreateCategory";
import CategoriesServices from "../../../../../services/CategoriesServices";

const CategoriesList = (props) => {

    const {keycloak, initialized} = useKeycloak()
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        CategoriesServices.getCategories(keycloak.token, props.id)
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
    }

    const createCategory = (title) => {
        CategoriesServices.createCategory(keycloak.token, title, props.id)
            .then(getCategories)
            .catch(err => console.log(err))
    }

    const deleteCategory = (id) => {
        CategoriesServices.deleteCategory(keycloak.token, id)
            .then(getCategories)
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCategories()
    }, [setCategories, initialized]);

    return (
        <div className={classes.container}>
            {categories.map((el) => <CategoriesItem delete={deleteCategory} id={el.id} key={el.id} data={el} />)}
            <CreateCategory create={createCategory}/>
        </div>
    );
};

export default CategoriesList;