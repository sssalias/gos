import { Comment } from 'src/entities/appeal/model'
import { AppealsService } from 'src/shared/api'

export const send = async (
    id: string,
    comment: Comment,
    token: string | undefined,
    updateData: (token: string) => void,
    reset: () => void
) => {
    try {
        if (token) {
            const {body} = comment
            await AppealsService.sendComment(token, id, {body, photoIds: []})
            reset()
            updateData(token)
        }
    } catch (e) {
        alert('Что-то пошло не так')
        console.log(e)
    }
}