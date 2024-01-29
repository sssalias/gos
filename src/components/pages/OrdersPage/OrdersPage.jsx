import React from 'react';
import BaseLayout from "../../layout/BaseLayout";
import OrdersTable from "./OrdersTable/OrdersTable";

const MenuPage = () => {


    return (
        <BaseLayout>
            <h1>ЗАКАЗЫ</h1>
            <OrdersTable/>
        </BaseLayout>
    );
};

export default MenuPage;