import {makeRequest} from "./index"

class MenuService {

    path = '/menu'
    getMenu(token) {
        return makeRequest(token, 'GET', this.path)
    }
}

export default new MenuService()