import classes from './style.module.css'

import React, { useState } from 'react'

import dot from 'src/assets/icons/dot.svg'
import { Link } from 'react-router-dom'
import classNames from 'classnames'


type PropsType = {
    link?: string,
    add?: boolean,
    icon?: string,
    move?: string,
    event?: any,
    children: React.ReactNode,
    active?: boolean
}

const SideItem = ({link, add, icon, move, event, children, active}: PropsType) => {


    const checkUrls = (link:string | undefined) => {
        return link === window.location.pathname
    }

    const [isLink] = useState(checkUrls(link))


    return (
        //@ts-ignore
        <Link className={classes.link__wrapper} to={link ? `/${link}` : null}>
        <div style={add ? {display:'flex', justifyContent: 'center'} : undefined } className={classNames(classes.container, isLink ? classes.container__active : '')} onClick={event}>
            {!add ?
                <div className={classes.icon}>
                    <img src={icon ?? dot} className={classes.img}/>
                </div>
                :
                null
            }
            <span style={add ? {fontSize: 20} : undefined}>{children}</span>
            {move ?
                <div className={classNames(classes.move, active ? classes.move__active : null)}>
                    <img src={move} alt="err"/>
                </div>
                : null
            }
        </div>
    </Link>
    )
}

export default SideItem