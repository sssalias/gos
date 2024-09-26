import { CategoriesService } from 'src/shared/api'

export const deleteCategory = async (
    token: string | undefined,
    id: string,
    menuId: string | undefined,
    updateData: (token:string, menuId: string) => void
) => {
    try {
        if (token && menuId) {
            await CategoriesService.del(token, id)
            updateData(token, menuId)
        }
    } catch (e) {
        console.log(e)
    }
}