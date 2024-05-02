import React, {useEffect, useState} from 'react';
import Modal from "../../../../UI/Modal/Modal";
import MenuTable from "../MenuTable/MenuTable";
import CreateDish from "../CreateDish/CreateDish";
import DishService from "../../../../../services/DishService";
import {useKeycloak} from "@react-keycloak/web";

const MenuModal = (props) => {

    const {keycloak, initialized} = useKeycloak()

    const [activeCreate, setActiveCreate] = useState(false)

    const [dishes, setDishes] = useState([])

    const getDishes = () => {
        DishService.getDishes(keycloak.token, props.id)
            .then(res => setDishes(res.data))
            .catch(err => console.log(err))
    }

    const createDish = (data) => {
        DishService.createDish(keycloak.token, data, props.id)
            .then(getDishes)
            .catch(err => console.log(err))
    }

    const deleteDish = (id) => {
        DishService.deleteDish(keycloak.token, id)
            .then(getDishes)
            .catch(err => console.log(err))
    }

    const updateDish = (data) => {
        DishService.updateDish(keycloak.token, data)
            .then(getDishes)
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getDishes()
    }, [setDishes, initialized]);

    return (
        <Modal close={props.close} title={props.title} active={props.active}>
            <MenuTable update={updateDish} delete={deleteDish} data={dishes}/>
            <CreateDish create={createDish} active={activeCreate} close={() => setActiveCreate(false)}/>
            <button onClick={() => setActiveCreate(true)} style={{width: '100%'}}>+</button>
        </Modal>
    );
};

export default MenuModal;