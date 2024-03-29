import SideItem from "../SideItem/SideItem";
import React, {useEffect, useState} from "react";

import  classes from './UnderSideItem.module.css'
import classNames from "classnames"

import move from '../../../../assets/img/icons/move.svg'
import MenuService from "../../../../services/MenuService";
import {useKeycloak} from "@react-keycloak/web";
import Modal from '../../Modal/Modal';

const UnderSideItem = (props) => {
    const {keycloak, initialized} = useKeycloak()
    const [active, setActive] = useState(false)

    const [menuUrls, setMenuUrls] = useState([])

    const [modalIsActive, setModalIsActive] = useState(false)

    const [today, setToday] = useState(false)
    const [tomorrow, setTomorrow] = useState(false)

    const [data, setData] = useState({
        title: '',
        today: false
    })

    const createMenu = () => {
        MenuService.createMenu(keycloak.token, {title: data.title, type: data.today})
            .then(() => {
                getMenuUrls()
            })
            .catch(err => console.log(err))
        setModalIsActive(false)
    }

    const getMenuUrls = () => {
        MenuService.getMenu(keycloak.token)
            .then(res => {
                setMenuUrls(res.data)

                console.log(res.data)

                for (let item of res.data) {
                    if (item.type === 'today') {
                        setToday(true)
                        break
                    }
                }

                for (let item of res.data) {
                    if (item.type === 'tomorrow') {
                        setTomorrow(true)
                        break
                    }
                }

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (initialized) {
            getMenuUrls()
        }
    }, [initialized]);


    console.log(today, tomorrow)

    return (
        <div className={classes.container}>
            <Modal title='Добавить меню' close={() => setModalIsActive(false)} active={modalIsActive}>
                <div style={{margin: '0 auto', width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 20}}>
                    {today ? null :
                        <label style={
                            {
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 5
                            }
                        }>
                            <input onChange={e => setData({title: 'На сегодня', today: 'today'})} name='type' style={{width: '10%'}} type="radio"/>
                            <span>На сегодня</span>
                        </label>
                    }
                    {tomorrow ? null :
                        <label style={
                            {
                                width: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 5
                            }
                        }>
                            <input onChange={e => setData({title: 'На завтра', today: 'tomorrow'})} name='type' style={{width: '10%'}} type="radio"/>
                            <span>На завтра</span>
                        </label>
                    }
                    
                    <button onClick={createMenu}>Добавить</button>
                </div>
            </Modal>
            <SideItem event={e => setActive(!active)} active={active} move={move} icon={props.icon}>МЕНЮ</SideItem>
            <div className={classes.content}>
                <div className={classNames(classes.content__wrapper, active ? classes.content__wrapper__active: null)}>
                    {menuUrls.map((el) => <SideItem key={el.id} link={el.id}>{el.title}</SideItem>)}
                    {today && tomorrow ? null : <SideItem event={() => setModalIsActive(true)} add={true} link={null}>+</SideItem>}
                </div>
            </div>
        </div>
    );
};

export default UnderSideItem;