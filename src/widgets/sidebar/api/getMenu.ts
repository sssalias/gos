import MenuService from 'src/shared/api/services/MenuService'

export const getMenu = async (
    token: string,
    setData: (data:any) => void
) => {
    try {
        const {data} = await MenuService.get(token)
        setData(data)
    } catch (e) {
        console.log(e)
    }
}