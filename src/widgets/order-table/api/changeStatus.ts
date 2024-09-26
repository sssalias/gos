import OrdersService from 'src/shared/api/services/OrdersService'

export const changeStatus = async (
    token: string | undefined,
    id: string,
    status: string,
    data: any,
    updateData: (token: string) => void
) => {
    try {
        if (token) {
            await OrdersService.updateStatus(token, id, status, data)
            updateData(token)
        }
    } catch (e) {
        console.log(e)
    }
}