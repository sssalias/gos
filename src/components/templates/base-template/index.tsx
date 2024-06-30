import React from 'react'
import classes from './style.module.css'
import Side from 'src/components/organisms/side'
import Header from 'src/components/organisms/header'

type PropsType = {
    children: React.ReactNode
}

const BaseTemplate = ({children}: PropsType) => {
  return (
    <div className={classes.base}>
        <Side/>
        <div className={classes.content}>
            <Header/>
            <div className={classes.wrapper}>
                {children}
            </div>

        </div>
    </div>
  )
}

export default BaseTemplate