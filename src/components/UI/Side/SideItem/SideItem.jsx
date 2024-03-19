import React, {useState} from 'react';
import classes from './SideItem.module.css'
import dot from '../../../../assets/img/icons/dot.svg'
import {Link} from "react-router-dom";

import classNames from "classnames";


const SideItem = (props) => {

    const checkUrls = (link) => {
        return link === window.location.pathname
    }

    let [link, setLink] = useState(checkUrls(props.link))

    return (
        <Link className={classes.link__wrapper} to={props.link ? `/${props.link}` : null}>
            <div style={props.add ? {display:'flex', justifyContent: 'center'} : null } className={classNames(classes.container, link ? classes.container__active : '')} onClick={props.event}>
                {!props.add ?
                    <div className={classes.icon}>
                        <img src={props.icon ?? dot} className={classes.img}/>
                    </div>
                    :
                    null
                }
                <span style={props.add ? {fontSize: 20} : null}>{props.children}</span>
                {props.move ?
                    <div className={classNames(classes.move, props.active ? classes.move__active : null)}>
                        <img src={props.move} alt=""/>
                    </div>
                    : null
                }
            </div>
        </Link>
    );
};

export default SideItem;