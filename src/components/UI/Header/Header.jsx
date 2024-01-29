import React from 'react';
import classes from './Header.module.css'
const Header = () => {
    return (
        <header>
            <div className={classes.container}>
                <div className={classes.wrapper}>

                    <div className={classes.user}>
                        <h4 className={classes.info}>Alexn Efm</h4>
                        <div className={classes.avatar}></div>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;