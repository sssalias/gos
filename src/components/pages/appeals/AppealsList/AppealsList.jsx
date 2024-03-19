import React, {useEffect, useState} from 'react';
import AppealsItem from "./AppealsItem/AppealsItem";
import classes from './AppealsList.module.css'
import {useRequest} from "../../../../hooks/requestHook";
import AppealsService from "../../../../services/AppealsService";
import {useKeycloak} from "@react-keycloak/web";

const AppealsList = () => {

    const [appeals, setAppeals] = useState([])
    // const {loaded, response, error} = useRequest({url: '/appeals', method: 'GET'})
    const {keycloak, initialized} = useKeycloak()

    const [appealsFilter, setAppealsFilter] = useState('ВСЕ')
    const [importantFilter, setImportantFilter] = useState('ВСЕ')

    const [filerAppeals, setFilterAppeals] = useState([])

    const getAppeals = () => {

        console.log(keycloak.token)

        AppealsService.getAppeals(keycloak.token)
            .then(res => {
                setAppeals(res.data)
                setFilterAppeals(res.data)
            })
    }

    useEffect(() => {
        if (initialized) {
            getAppeals()
        }
    }, [initialized, setAppeals]);


    useEffect(() => {
        if (initialized) {
            setFilterAppeals(appealsFilter !== 'ВСЕ' ? appeals.filter(el => el.status === appealsFilter) : appeals)
        }
    }, [initialized, appealsFilter]);

    useEffect(() => {
        if(initialized) {
            console.log(filerAppeals)
            setFilterAppeals(appeals.filter(el => el.ownerRoles.includes(importantFilter)))
        }
    }, [initialized, importantFilter])



    const deleteAppeal = (id) => {
        AppealsService.deleteAppeal(keycloak.token, id)
            .then(getAppeals)
            .catch(err => console.log(err))
    }
    const sendFeedback = (id, body) => {
        AppealsService.sendFeedback(keycloak.token, id, body)
            .then(getAppeals)
            .catch(err => console.log(err))
    }

    const updateStatus = (id, status) => {
        AppealsService.updateStatus(keycloak.token, id, status)
            .then(getAppeals)
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.container}>
            <div style={{display: 'flex', justifyContent: 'center', gap: 10}}>
                <h4>Статус:</h4>
                <select value={appealsFilter} onChange={e => setAppealsFilter(e.target.value)}>
                    <option value="ВСЕ">ВСЕ</option>
                    <option value="NEW">NEW</option>
                    <option value="Принято">Принято</option>
                    <option value="Отклонено">Отклонено</option>
                </select>
                <h4>Роль автора:</h4>
                <select value={importantFilter} onChange={e => setImportantFilter(e.target.value)}>
                    <option value="user">ВСЕ</option>
                    <option value="super_vip">VIP</option>
                    <option value="vip">SUPER VIP</option>
                </select>
            </div>
            {filerAppeals.map(el => <AppealsItem updateStatus={updateStatus} feedbackEvent={sendFeedback} ownerRole={el.ownerRoles[0]} event={deleteAppeal} status={el.status} id={el.id} key={el.id} number={el.number} ownerEmail={el.ownerEmail} body={el.body} feedback={el.feedback !== null ? el.feedback.body : null}/>)}
        </div>
    );
};

export default AppealsList;