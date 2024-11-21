import { NewsService } from 'src/shared/api'

export const getOrderNews = async (
    token: string
) => {
    return await NewsService.getPersonal(token)
}