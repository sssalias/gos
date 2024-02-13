import React, {useEffect, useState} from 'react';
import classes from './CommentsList.module.css'
import CommentsItem from "./CommentsItem/CommentsItem";
import AppealsService from "../../../../services/AppealsService";
import {useKeycloak} from "@react-keycloak/web";


const CommentsList = (props) => {

    const [comments, setComments] = useState([])
    const {keycloak, initialized} = useKeycloak()

    const getComments = () => {
        AppealsService.getAppeals(keycloak.token)
            .then(res => {
                setComments(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const deleteComment = (id) => {
        AppealsService.deleteAppeal(keycloak.token, id)
            .then(getComments)
            .catch(err => console.log(err))
    }

    const sendFeedback = (id, body) => {
        AppealsService.sendFeedback(keycloak.token, id, body)
            .then(getComments)
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (keycloak.token !== undefined) {
            getComments()
        }
    }, [initialized]);
    return (
        <div className={classes.container}>
            <CommentsItem data={{commentId: 23, email: 'a@m.ru', text: 'some text', id: 23}}/>
            {comments.map((el) => <CommentsItem feedback={sendFeedback}  delete={deleteComment} key={el.number} data={{commentId: el.number, text: el.body, id: el.id, email: el.ownerEmail, feedback: el.feedback !== null ? el.feedback.body: null}}/>)}
        </div>
    );
};

export default CommentsList;