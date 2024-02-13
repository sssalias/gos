import React from 'react';
import BaseLayout from "../../layout/BaseLayout";
import CategorySlider from "./CategorySlider/CategorySlider";
import classes from './Menu2.module.css'
import Table from "rc-table";

const Menu2 = () => {
    return (
        <BaseLayout>
            <h1>Меню на сегодня</h1>
            <CategorySlider/>
            <div className={classes.list}>
                <h2>Супы</h2>
                <p>Чёрный</p>
            </div>
        </BaseLayout>
    );
};

export default Menu2;