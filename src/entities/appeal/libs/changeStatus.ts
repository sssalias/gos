import { AppealsService } from 'src/shared/api'

export const changeStatus = async (
    id:string,
    token: string | undefined,
    status: string,
    updateData: (token:string) => void
) => {
    try {
        if (token) {
            await AppealsService.updateStatus(token, id, status)
            updateData(token)
        }
    } catch(e) {
        alert('Что-то пошло не так')
        console.log(e)
    }
}