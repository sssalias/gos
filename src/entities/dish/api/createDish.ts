import { DishServices } from 'src/shared/api'

export const createDish = async (
    token: string | undefined,
    categoryId: string | undefined,
    data: any,
    updateData: (token:string, categoryId: string) => void,
    reset: () => void,
    onClose: () => void
) => {
    try {
        if (token && categoryId) {
            await DishServices.create(token, {...data, description: 'safas', photoId: null,}, categoryId)
            updateData(token, categoryId)
            reset()
            onClose()
        }
    } catch (e) {
        alert('Что-то пошло не так!')
        console.log(e)
    }
}