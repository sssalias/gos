import CategoriesService from 'src/shared/api/services/CategoriesService'

export const getCategory = async (
    id: string | undefined,
    token: string | undefined,
    setData: (data:any[]) => void
) => {
    try {
        if (token && id) {
            const {data} = await CategoriesService.get(token, id)
            setData(data)
        }
    } catch (e) {
        console.log(e)
    }
}