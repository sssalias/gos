import React, {useContext, useMemo, useState} from 'react';
import classes from "./Side.module.css";
import Logo from "../Logo/Logo";
import SideItem from "./SideItem/SideItem";
import menu from '../../../assets/img/icons/menu.svg'
import orders from '../../../assets/img/icons/orders.svg'
import comments from '../../../assets/img/icons/comments.svg'
import UnderSideItem from "./UnderSideItem/UnderSideItem";
const Side = (props) => {

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Logo/>
                <UnderSideItem icon={menu}/>
                <SideItem link='/orders' icon={orders}>ЗАКАЗЫ</SideItem>
                <SideItem link='/comments' icon={comments}>ОБРАЩЕНИЯ</SideItem>
            </div>
        </div>
    );
};

export default Side;