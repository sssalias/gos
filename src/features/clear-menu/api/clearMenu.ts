import MenuService from 'src/shared/api/services/MenuService'

export const clearMenu = async (
    token:string | undefined,
    id: string | undefined,
    updateData: (token:string, id: string) => void
) => {
    try {
        if (token && id) {
            await MenuService.clear(token, id)
            updateData(token, id)
        }
    } catch (e) {
        console.log(e)
    }
}