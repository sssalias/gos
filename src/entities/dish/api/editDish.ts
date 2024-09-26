import { DishServices } from 'src/shared/api'

export const editDish = async (
    token: string | undefined,
    data: any,
    categoryId: string | undefined,
    updateData: (token:string, categoryId: string) => void,
    onClose: () => void,
    reset: () => void
) => {
    try {
        if (token && categoryId) {
            await DishServices.update(token, data)
            updateData(token, categoryId)
            onClose()
            reset()
        }
    } catch (e) {
        console.log(e)
    }
}