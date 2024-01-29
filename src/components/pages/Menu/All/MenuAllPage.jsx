import React, {useEffect, useState} from 'react';
import BaseLayout from "../../../layout/BaseLayout";
import ImportButton from "../utils/ImportMenu/ImportButton/ImportButton";
import CategoriesList from "../utils/CategoriesList/CategoriesList";
// d4e4ced9-978d-4c18-b1de-9fa511db9644
const MenuAllPage = () => {

    return (
        <BaseLayout>
            <h1>МЕНЮ ОБЩЕЕ</h1>
            <CategoriesList/>
            <ImportButton/>
        </BaseLayout>
    );
};

export default MenuAllPage;