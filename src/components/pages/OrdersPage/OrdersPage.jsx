import React, {useEffect, useState} from 'react';
import BaseLayout from "../../layout/BaseLayout";
import OrdersTable from "./OrdersTable/OrdersTable";
import OrdersService from "../../../services/OrdersService";
import {useKeycloak} from "@react-keycloak/web";

const MenuPage = () => {

    const {keycloak, initialized} = useKeycloak()
    const [data, setData] = useState([])

    const getOrders = () => {
        OrdersService.getOrders(keycloak.token)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }

    const updateOrder = (id, status, data) => {
        OrdersService.updateStatus(keycloak.token, id, status, data)
            .then(getOrders)
            .catch(err => console.log(err))
    }


    useEffect(() => {
        if (initialized) {
            getOrders()
            setInterval(() => {
                getOrders()
            }, 5000)
        }
    }, [setData, initialized]);

    return (
        <BaseLayout>
            <h1>ЗАКАЗЫ</h1>
            <OrdersTable update={updateOrder} data={data}/>
        </BaseLayout>
    );
};

export default MenuPage;