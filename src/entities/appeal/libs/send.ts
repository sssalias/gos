import { Comment } from 'src/entities/appeal/model'
import { AppealsService, MediaService } from 'src/shared/api'

export const send = async (
    id: string,
    comment: Comment,
    token: string | undefined,
    updateData: (token: string) => void,
    reset: () => void
) => {
    try {
        if (token) {
            if (comment.photoIds.length === 0) {
                await AppealsService.sendComment(token, id, {...comment, photoIds: []})
            } else {
                let photoIds:string[] = []
                await MediaService.uploadList(token, comment.photoIds)
                    .then(res => photoIds = res.map(el => el.data.id))
                await AppealsService.sendComment(token, id, {...comment, photoIds})
            }
            reset()
            updateData(token)
        }
    } catch (e) {
        alert('Что-то пошло не так')
        console.log(e)
    }
}