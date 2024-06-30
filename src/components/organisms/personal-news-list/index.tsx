import PersonalNewsItem from 'src/components/molecules/personal-news-item'
import classes from './style.module.scss'
import CreatePersonalNews from 'src/components/molecules/create-personal-news'
import { usePersonalNewsStore } from 'src/store/personal-news'

type PropsType = {
    userId: string
}

const PersonalNewsList = ({userId}: PropsType) => {

    const {data} = usePersonalNewsStore()

    console.log(data)
    

    return (
        <div className={classes.container}>
            <CreatePersonalNews userId={userId}/>
            {data
                .filter(el => el.forUserId === userId)
                .map(el => <PersonalNewsItem id={el.id} title={el.title} body={el.body} photoIds={el.photoIds}/>)}
        </div>
    )
}

export default PersonalNewsList