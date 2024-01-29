import React, {useEffect, useState} from 'react';
import classes from './CommentsList.module.css'
import CommentsItem from "./CommentsItem/CommentsItem";
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";

const CommentsList = (props) => {

    const [comments, setComments] = useState([])

    // console.log(axiosInstance.defaults)
    const {keycloak, initialized} = useKeycloak()

    const getComments = () => {
        axios.get('http://localhost:2002/appeals', {headers: {
                Authorization: `Bearer ${keycloak.token}`
            } })
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
    }

    const deleteComment = (id) => {
        axios.delete(`http://localhost:2002/appeals/${id}`, {
            headers: {Authorization: `Bearer ${keycloak.token}`}
        })
            .then(getComments)
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (initialized) {
            getComments()
        }
    }, [setComments, initialized]);
    return (
        <div className={classes.container}>
            {comments.map((el) => <CommentsItem delete={deleteComment} key={el.number} data={{commentId: el.number, text: el.body, id: el.id}}/>)}
        </div>
    );
};

export default CommentsList;