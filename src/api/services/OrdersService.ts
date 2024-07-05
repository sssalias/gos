import { Methods, makeRequest } from '../config'

class OrdersSerivce {
    private readonly path = '/orders'

    public async get(token:string) {
        return makeRequest(token, Methods.GET, this.path)
    }

    public updateStatus(token:string, id:string, status:string, data:any) {
                const {placeOfDelivery, countOfPersons, wishes, submissionTime, dishes, paymentMethod} = data
        const dishIds = []
        for (let el of dishes) {
            dishIds.push(el.id)
        }
        const newData = {placeOfDelivery, countOfPersons, wishes, submissionTime, paymentMethod, dishIds, id, status}
        return makeRequest(token, Methods.PUT, this.path, newData)
    }
}



export default new OrdersSerivce()