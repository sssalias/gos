import {makeRequest} from "./index"


class DishService {

    path = '/dishes'

    getDishes(token, id) {
        return makeRequest(token, 'GET', `${this.path}/category/${id}`)
    }

    createDish(token, data, categoryId) {
        return makeRequest(token, 'POST', this.path, {...data, categoryId})
    }

    deleteDish(token, id) {
        return makeRequest(token, 'DELETE', `${this.path}/${id}`)
    }
}

export default new DishService()