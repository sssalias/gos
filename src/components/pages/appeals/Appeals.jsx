import React, {useEffect} from 'react';
import BaseLayout from "../../layout/BaseLayout";
import AppealsList from "./AppealsList/AppealsList";

const Appeals = () => {

    return (
        <BaseLayout>
            <h1>Обращения</h1>
            <AppealsList/>
        </BaseLayout>
    );
};

export default Appeals;