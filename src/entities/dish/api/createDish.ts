import { DishServices, MediaService } from 'src/shared/api'

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
            try {
                const res = await MediaService.upload(token, {file: data.photoId[0]})
                await DishServices.create(token, {...data, description: 'safas', photoId: res.data.id}, categoryId)
            } catch {
                await DishServices.create(token, {...data, description: 'safas', photoId: null,}, categoryId)
            }
            // await DishServices.create(token, {...data, description: 'safas', photoId: null,}, categoryId)
            updateData(token, categoryId)
            reset()
            onClose()
        }
    } catch (e) {
        alert('Что-то пошло не так!')
        console.log(e)
    }
}