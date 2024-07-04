import MediaService from 'src/api/services/MediaService'
import ModalTemplate from 'src/components/templates/modal-template'
import classes from './style.module.scss'


type PropsType = {
	active: boolean
	close: any
    data: any
}

const GroupNewsModal = ({active, close, data}:PropsType) => {
    return (
        <ModalTemplate title={`Новость: ${data.forUserTypes}`} active={active} close={close}>
			<h1>{data.title}</h1>
            <h2>Категория: {data.forUserTypes}</h2>
            <p>{data.body}</p>
            <div className={classes.imgs_container}>
                {
                    data.photoIds.map((el:any) => (
                        <div className={classes.img}>
                            <img src={MediaService.getFile(el)} alt='(('/>
                        </div>
                    ))
                }
            </div>
        </ModalTemplate>
    )
}

export default GroupNewsModal