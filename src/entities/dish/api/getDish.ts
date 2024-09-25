import { DishServices } from 'src/shared/api'

export const getDish = async (
    token: string | undefined,
    categoryId: string | undefined,
    setData: (data:any) => void
) => {
    try {
        if (token && categoryId) {
            const {data} = await DishServices.get(token, categoryId)
            setData(data)
        }
    } catch (e) {
        console.log(e)
    }
}