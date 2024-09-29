import OrdersService from 'src/shared/api/services/OrdersService'

export const deleteDish = async (
    token: string | undefined,
    data: any,
    id: string,
    delDishIds: Set<string>,
    updateData: (token: string) => void
) => {
    try {
        if (token) {
            await OrdersService.deleteDish(token, id, delDishIds, data)
            updateData(token)
        }
    } catch (e) {
        console.log(e)
    }
}