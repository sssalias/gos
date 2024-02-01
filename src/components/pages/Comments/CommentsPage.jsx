import React, {useEffect, useState} from 'react';
import BaseLayout from "../../layout/BaseLayout";
import CommentsList from "./CommentsList/CommentsList";
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";


const MenuPage = () => {

    return (
        <BaseLayout>
            <h1>ОБРАЩЕНИЯ</h1>
            <CommentsList/>
        </BaseLayout>
    );
};

export default MenuPage;