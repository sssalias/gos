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
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
    }

    const deleteComment = (id) => {
        AppealsService.deleteAppeal(keycloak.token, id)
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
            {comments.map((el) => <CommentsItem delete={deleteComment} key={el.number} data={{commentId: el.number, text: el.body, id: el.id}}/>)}
        </div>
    );
};

export default CommentsList;