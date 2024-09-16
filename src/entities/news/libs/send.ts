import { NewsService } from 'src/shared/api'

type Data = {
    title: string
    body: string
    forUserTypes: string
}

export const send = async (data:Data, 
    token:string | undefined, 
    onClose: () => void, 
    updateData: (token: string) => void,
    reset: () => void
    ) => {
    try {
        if (token) {
            const {title, body, forUserTypes} = data
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