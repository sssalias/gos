import { News } from 'src/entities/news/model'
import { NewsService } from 'src/shared/api'


export const send = async (news:News, 
    token:string | undefined, 
    onClose: () => void, 
    updateData: (token: string) => void,
    reset: () => void
    ) => {
    try {
        if (token) {
            const {title, body, forUserTypes} = news
            await NewsService.createForGroup(token, {title, body, forUserTypes, photoIds: []})
            onClose()
            reset()
            updateData(token)
        }
    } catch (e) {
        alert('Что-то пошло не так...')
        console.log(e)
    }
}