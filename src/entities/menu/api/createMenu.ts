import MenuService from 'src/shared/api/services/MenuService'

export const createMenu = async (
    token: string | undefined,
    data: any,
    updateData: (token: string) => void,
    reset: () => void,
    onClose: () => void
) =>  {
    try {
        if(token) {
            await MenuService.create(token, {type: data.type, title: data.type})
            updateData(token)
            reset()
            onClose()
        }
    } catch (e) {
        alert('Что-то пошло не так...')
        console.log(e)
    }
}