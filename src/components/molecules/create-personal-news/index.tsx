import { useState } from 'react'
import classes from './style.module.scss'
import CreatePersonalNewsModal from 'src/components/organisms/create-personal-news-modal'

type PropsType = {
    userId: string
}

const CreatePersonalNews = ({userId}:PropsType) => {

    const [modalActive, setModalActive] = useState(false)

    return (
        <>
            <CreatePersonalNewsModal userId={userId} active={modalActive} close={() => setModalActive(false)}/>
            <div onClick={() => setModalActive(true)} className={classes.container}>
                <h3>+</h3>
            </div>
        </>
    )
}

export default CreatePersonalNews