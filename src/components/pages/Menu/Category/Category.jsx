import React, {useState} from 'react';
import CategoriesList from "../utils/CategoriesList/CategoriesList";
import classes from './Category.module.css'
import {getFile} from '../../../../utils/formData';
import MenuService from '../../../../services/MenuService';

import {FaTrash} from 'react-icons/fa'
import {useKeycloak} from "@react-keycloak/web";
import DeleteModal from "../../../UI/DeleteModal/DeleteModal";
import {format} from "date-fns";

const Category = (props) => {
    const [file, setFile] = useState(null)
    const {keycloak, initialized} = useKeycloak()

    const [activeDeleteModal, setActiveDeleteModal] = useState(false)

    const parse = () => {
        MenuService.parse(keycloak.token, {file: file, menuType: props.menu.type})
            .then((res) => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const clearMenu = () => {
        MenuService.clearMenu(keycloak.token, props.menu.id)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.container}>
            <DeleteModal title='все позиции меню' active={activeDeleteModal} close={() => setActiveDeleteModal(false)} event={clearMenu}/>
            <div className={classes.header}>
                <h1>{props.title} {props.dateTo ? format(props.dateTo, 'dd.MM.yyyy') : null}</h1>
                <button onClick={() => setActiveDeleteModal(true)}>{FaTrash()}</button>
            </div>
            <CategoriesList id={props.id}/>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 20
            }}>
                <input required={true} type="file" onChange={e => setFile(getFile(e))}/>
                <button onClick={parse}>Импортировать меню</button>
            </div>
        </div>
    );
};

export default Category;