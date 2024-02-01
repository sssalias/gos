import {makeRequest} from "./index";


class CategoriesServices {

    path = `/categories`
    getCategories(token, id) {
        return makeRequest(token, 'GET', `${this.path}/menu/${id}`)
    }
    createCategory(token, title, menuId) {
        return makeRequest(token, 'POST', this.path, {title, menuId})
    }
    deleteCategory(token, id) {
        return makeRequest(token, 'DELETE', `${this.path}/${id}`)
    }
}

export default new CategoriesServices()