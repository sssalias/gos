import { News } from 'src/entities/news/model'
import { MediaService, NewsService } from 'src/shared/api'


export const send = async (
    news:News, 
    token:string | undefined, 
    onClose: () => void, 
    updateData: (token: string) => void,
    reset: () => void
    ) => {
    try {
        if (token) {
            if (news.photoIds.length === 0) {
                await NewsService.createForGroup(token, {...news, photoIds: []}) 
            } else {
                let photoIds:string[] = []
                await MediaService.uploadList(token, news.photoIds)
                    .then(res => photoIds = res.map(el => el.data.id))
                    await NewsService.createForGroup(token, {...news, photoIds}) 
            }
            onClose()
            reset()
            updateData(token)
        }
    } catch (e) {
        alert('Что-то пошло не так...')
        console.log(e)
    }
}