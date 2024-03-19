import React, {useState} from 'react';
import CategoriesList from "../utils/CategoriesList/CategoriesList";
import classes from './Category.module.css'
import {getFile} from '../../../../utils/formData';
import MenuService from '../../../../services/MenuService';

const Category = (props) => {
    const [file, setFile] = useState(null)

    const parse = () => {
        MenuService.parse({file: file, menu_title: props.menu.title, menu_id: props.menu.id, menu_type: props.menu.type})
            .then((res) => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.container}>
            <h1>{props.title}</h1>
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