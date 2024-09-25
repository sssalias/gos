import { DishServices } from 'src/shared/api'

export const deleteDish = async (
    token: string | undefined,
    id: string,
    categoryId: string | undefined,
    updateData: (token:string, categoryId:string) => void
) => {
    try {
        if (token && categoryId && id.length !== 0) {
            await DishServices.del(token, id)
            updateData(token, categoryId)
        }
    } catch (e) {
        console.log(e)
    }
}