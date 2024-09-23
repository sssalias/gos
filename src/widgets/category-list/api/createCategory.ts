import CategoriesService from 'src/shared/api/services/CategoriesService'

export const createCategory = async (
    token: string | undefined,
    title: string,
    menuId: string | undefined,
    updateData: (token: string, menuId: string) => void,
    reset: () => void,
    onClose: () => void
) => {
    try {
        if (token && menuId) {
            await CategoriesService.create(token, title, menuId)
            updateData(token, menuId)
            reset()
            onClose()
        }
    } catch (e) {
        alert('Что-то пошло не так...')
        console.log(e)
    }
}