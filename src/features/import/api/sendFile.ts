import MenuService from 'src/shared/api/services/MenuService'

export const sendFile = async (
    token: string | undefined,
    menuType: string | undefined,
    menuId: string | undefined,
    fileList: FileList | null,
    updateData: (token:string, menuId: string) => void
) => {
    try {
        if (token && fileList && menuType && menuId) {
            const file = fileList[0] 
            await MenuService.parse(token, {file: file, menuType: menuType})
            updateData(token, menuId)
        }
    } catch (e) {
        console.log(e)
    }
}