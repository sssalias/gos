import React, {createContext, useContext, useState} from 'react';
import Side from "../UI/Side/Side";
import Header from "../UI/Header/Header";

import classes from './BaseLayout.module.css'

const BaseLayout = (props) => {


    return (
        <div className={classes.base}>
            <Side/>
            <Header/>
            <div className={classes.content}>

                <div className={classes.wrapper}>
                    {props.children}
                </div>

            </div>
        </div>
    );
};

export default BaseLayout;