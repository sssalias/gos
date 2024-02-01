import React from 'react';
import CategoriesList from "../utils/CategoriesList/CategoriesList";
import classes from './Category.module.css'

const Category = (props) => {
    return (
        <div className={classes.container}>
            <h1>{props.title}</h1>
            <CategoriesList id={props.id}/>
        </div>
    );
};

export default Category;