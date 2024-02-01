import React, {useState} from 'react';
import Modal from "../../../UI/Modal/Modal";
import MenuTable from "../../Menu/utils/MenuTable/MenuTable";
import classes from './OrderModal.module.css'
import CreateDish from "../../Menu/utils/CreateDish/CreateDish";

const OrderModal = (props) => {

    const [active, setActive] = useState(false)

    return (
        <>
            <Modal title={`Заказ №${props.data.number}`} close={props.close} active={props.active}>

                <CreateDish active={active} close={() => setActive(false)}/>

                <MenuTable data={props.data.dishes}/>
                {/*<button onClick={() => setActive(true)} className={classes.button} >+</button>*/}
            </Modal>
        </>
    );
};

export default OrderModal;