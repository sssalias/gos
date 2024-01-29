import React, {useEffect, useState} from 'react';
import CategoriesItem from "./CategoriesItem/CategoriesItem";
import classes from './CategoriesList.module.css'
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";
import CreateCategory from "./CreateCategory/CreateCategory";

const CategoriesList = (props) => {


    const [categories, setCategories] = useState([])

    const {keycloak, initialized} = useKeycloak()

    const getCategories = () => {
        axios.get('http://localhost:2002/categories', {headers: {Authorization: `Bearer ${keycloak.token}`}})
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
    }

    const createCategory = (title) => {
        axios.post('http://localhost:2002/categories', {title}, {headers: {Authorization: `Bearer ${keycloak.token}`}})
            .then(getCategories)
            .catch(err => console.log(err))
    }

    const deleteCategory = (id) => {
        axios.delete(`http://localhost:2002/categories/${id}`, {headers: {Authorization: `Bearer ${keycloak.token}`}})
            .then(getCategories)
            .catch(err => console.log(err))
    }

    useEffect(() => {

        if (initialized) {
            getCategories()
        }
    }, [setCategories, initialized]);

    return (
        <div className={classes.container}>
            {categories.map((el) => <CategoriesItem delete={deleteCategory} key={el.id} data={el} />)}
            <CreateCategory create={createCategory}/>
        </div>
    );
};

export default CategoriesList;