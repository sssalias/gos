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
    public async deleteDish(token:string, id: string, delDishIds: Set<string>, data:any) { 
        const {placeOfDelivery, countOfPersons, wishes, submissionTime, dishes, paymentMethod, status} = data       
        const dishIds = []
        for (let item of dishes) {
            if (!Array.from(delDishIds).includes(item.id)) {
                dishIds.push(item.id)
            }
        }
        const newData = {placeOfDelivery, status, countOfPersons, wishes, submissionTime, paymentMethod, dishIds, id}
        console.log(newData)
        return makeRequest(token, Methods.PUT, this.path, newData)
    }
}



export default new OrdersSerivce()