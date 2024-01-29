import React, {useState} from 'react';
import Modal from "../../../../UI/Modal/Modal";
import MenuTable from "../MenuTable/MenuTable";
import CreateDish from "../CreateDish/CreateDish";

const MenuModal = (props) => {
    const [activeCreate, setActiveCreate] = useState(false)

    return (
        <Modal close={props.close} title={props.title} active={props.active}>
            <CreateDish/>
            <MenuTable data={props.data}/>
            <CreateDish active={activeCreate} close={() => setActiveCreate(false)}/>
            <button onClick={() => setActiveCreate(true)} style={{width: '100%'}}>+</button>
        </Modal>
    );
};

export default MenuModal;