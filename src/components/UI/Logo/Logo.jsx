import React from 'react';
import classes from "./Logo.module.css";
import logo from '../../../assets/img/logo.png'

const Logo = (props) => {
    return (
        <div className={classes.logo}>
            <img src={logo} alt=""/>
            <div>
                <h4>СТОЛОВАЯ</h4>
                <h4>МИНПРОСВЕЩЕНИЯ</h4>
                <h4>РОССИИ</h4>
            </div>
        </div>
    );
};

export default Logo;