import SideItem from "../SideItem/SideItem";
import React, {useState} from "react";

import  classes from './UnderSideItem.module.css'
import classNames from "classnames"

import move from '../../../../assets/img/icons/move.svg'

const UnderSideItem = (props) => {
    // console.log(Context)
    const [active, setActive] = useState(false)

    return (
        <div className={classes.container}>
            <SideItem event={e => setActive(!active)} active={active} move={move} icon={props.icon}>МЕНЮ</SideItem>
            <div className={classes.content}>
                <div className={classNames(classes.content__wrapper, active ? classes.content__wrapper__active: null)}>
                    <SideItem link='/menu/all'>ОБЩЕЕ</SideItem>
                    <SideItem link='/menu/today'>НА СЕГОДНЯ</SideItem>
                    <SideItem link='/menu/tomorrow'>НА ЗАВТРА</SideItem>
                </div>
            </div>
        </div>
    );
};

export default UnderSideItem;