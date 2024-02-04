import {makeRequest} from "./index";

class OrdersService {

    path = '/orders'

    getOrders(token) {
        return makeRequest(token, 'GET', this.path)
    }

    // addDish(data, dishes, dish) {
    //     return makeRequest('PUT', this.path, {...data, dishes: [...dishes, dish]})
    // }

    updateStatus(token, id, status, data) {
        // console.log({...data, id, status})
        const {placeOfDelivery, countOfPersons, wishes, submissionTime, dishes} = data
        const dishIds = []
        for (let el of dishes) {
            dishIds.push(el.id)
        }
        const newData = {placeOfDelivery, countOfPersons, wishes, submissionTime, dishIds, id, status}
        return makeRequest(token, 'PUT', this.path, newData)
    }

}


export default new OrdersService()