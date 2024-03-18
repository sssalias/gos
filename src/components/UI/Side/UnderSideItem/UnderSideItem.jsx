import SideItem from "../SideItem/SideItem";
import React, {useEffect, useState} from "react";

import  classes from './UnderSideItem.module.css'
import classNames from "classnames"

import move from '../../../../assets/img/icons/move.svg'
import MenuService from "../../../../services/MenuService";
import {useKeycloak} from "@react-keycloak/web";

const UnderSideItem = (props) => {
    const {keycloak, initialized} = useKeycloak()
    const [active, setActive] = useState(false)

    const [menuUrls, setMenuUrls] = useState([])

    const getMenuUrls = () => {
        MenuService.getMenu(keycloak.token)
            .then(res => setMenuUrls(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (initialized) {
            getMenuUrls()
        }
    }, [setMenuUrls, initialized]);
    
    return (
        <div className={classes.container}>
            <SideItem event={e => setActive(!active)} active={active} move={move} icon={props.icon}>МЕНЮ</SideItem>
            <div className={classes.content}>
                <div className={classNames(classes.content__wrapper, active ? classes.content__wrapper__active: null)}>
                    {menuUrls.map((el) => <SideItem key={el.id} link={el.id}>{el.title}</SideItem>)}
                </div>
            </div>
        </div>
    );
};

export default UnderSideItem;