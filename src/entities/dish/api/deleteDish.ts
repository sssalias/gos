import { DishServices } from 'src/shared/api'

export const deleteDish = async (
    token: string | undefined,
    id: string
) => {
    try {
        if (token) {
            await DishServices.del(token, id)
        }
    } catch (e) {
        console.log(e)
    }
}