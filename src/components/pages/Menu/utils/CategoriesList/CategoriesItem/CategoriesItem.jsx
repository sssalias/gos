import React, {useEffect, useState} from 'react';
import classes from "./CategoriesItem.module.css";
import CloseButton from "../../../../../UI/CloseButton/CloseButton";
import MenuModal from "../../MenuModal/MenuModal";
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";
import DeleteModal from "../../../../../UI/DeleteModal/DeleteModal";

const CategoriesItem = (props) => {

    const [activeModal, setActiveModal] = useState(false)
    const [activeDeleteModal, setActiveDeleteModal] = useState(false)

    return (
        <div className={classes.container}>
            <DeleteModal active={activeDeleteModal} close={() => setActiveDeleteModal(false)} event={() => props.delete(props.data.id)}  title='категорию'/>
            <MenuModal id={props.id} close={() => setActiveModal(false)} active={activeModal} title={props.data.title}/>
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <CloseButton event={() => setActiveDeleteModal(true)}/>
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