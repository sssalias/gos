import React from 'react'
import Logo from '../../UI/Logo/Logo';
import classes from './permissionDenied.css'

const PermissionDenied = () => {
    return (
        <div className={classes.error_wrapper}>
            <Logo/>
            <h1>У ВАС НЕДОСТАТОЧНО ПРАВ!</h1>
        </div>
    );
};

export default PermissionDenied;