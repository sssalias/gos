import React, {useEffect, useState} from 'react';
import classes from "./CategoriesItem.module.css";
import CloseButton from "../../../../../UI/CloseButton/CloseButton";
import MenuModal from "../../MenuModal/MenuModal";
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";

const CategoriesItem = (props) => {

    const [activeModal, setActiveModal] = useState(false)

    return (
        <div className={classes.container}>
            <MenuModal id={props.id} close={() => setActiveModal(false)} active={activeModal} title={props.data.title}/>
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <CloseButton event={() => props.delete(props.data.id)}/>
                </div>
                <div className={classes.content}>
                    <h3>{props.data.title}</h3>
                </div>
                <button onClick={() => setActiveModal(true) }>Подробнее</button>
            </div>
        </div>
    );
};

export default CategoriesItem;