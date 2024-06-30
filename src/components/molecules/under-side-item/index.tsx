import { useEffect, useState } from 'react'
import classes from './style.module.css'
import SideItem from '../side-item'
import classNames from 'classnames'

import move from 'src/assets/icons/move.svg'
import ModalTemplate from 'src/components/templates/modal-template'
import { useMenuStore } from 'src/store/menu'
import MenuService from 'src/api/services/MenuService'
import { useUserStore } from 'src/store/user'
import { useSideStore } from 'src/store/side'


type PropsType = {
    icon: string,
}

const UnderSideItem = ({icon}:PropsType) => {

    const {updateData, data} = useMenuStore()
    const {token} = useUserStore()

    const {isOpen, setOpen} = useSideStore()

    const [menuUrls, setMenuUrls] = useState<any>([])

    const [modalIsActive, setModalIsActive] = useState(false)

    const [today, setToday] = useState(false)
    const [tomorrow, setTomorrow] = useState(false)

    const [types, setTypes] = useState({
        title: '',
        today: ''
    })

    useEffect(() => {
        console.log(data)
        for (let item of data) {
            if (item.type === 'today') {
                setToday(true)
                break
            }
        }

        for (let item of data) {
            if (item.type === 'tomorrow') {
                setTomorrow(true)
                break
            }
        }
    }, [data])


    useEffect(() => {
        setMenuUrls(data)
    }, [data])

    return (
        <>
            <ModalTemplate title='Добавить меню' close={() => setModalIsActive(false)} active={modalIsActive}>
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
                            <input onChange={() => setTypes({title: 'На сегодня', today: 'today'})} name='type' style={{width: '10%'}} type="radio"/>
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
                            <input onChange={() => setTypes({title: 'На завтра', today: 'tomorrow'})} name='type' style={{width: '10%'}} type="radio"/>
                            <span>На завтра</span>
                        </label>
                    }
                    
                    <button onClick={() => {
                        const create = async () => {
                            await MenuService.create(token, {title: types.title, type: types.today})
                            updateData(token)
                        }

                        create()
                    }}>Добавить</button>
                </div>
            </ModalTemplate>

            <div className={classes.container}>
            <SideItem event={() => setOpen(!isOpen)} active={isOpen} move={move} icon={icon}>МЕНЮ</SideItem>
                <div className={classes.content}>
                    <div className={classNames(classes.content__wrapper, isOpen ? classes.content__wrapper__active: null)}>
                        {menuUrls.map((el:any) => <SideItem key={el.id} link={el.id}>{el.title}</SideItem>)}
                        {today && tomorrow ? null : <SideItem event={() => setModalIsActive(true)} add={true} link={''}>+</SideItem>}
                    </div>
                </div>
        </div>
        </>
    )
}

export default UnderSideItem