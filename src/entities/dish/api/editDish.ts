import { DishServices, MediaService } from 'src/shared/api'

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
            try {
                const res = await MediaService.upload(token, {file: data.photoId[0]})
                await DishServices.update(token, {...data, description: 'safas', photoId: res.data.id}, categoryId)
            } catch {
                await DishServices.update(token, {...data, description: 'safas', photoId: null,}, categoryId)
            }
            // await DishServices.create(token, {...data, description: 'safas', photoId: null,}, categoryId)
            updateData(token, categoryId)
            reset()
            onClose()
        }
    } catch (e) {
        console.log(e)
    }
}