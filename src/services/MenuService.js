import {HOST, makeRequest} from "./index"
import axios from "axios";

class MenuService {

    path = '/menu'
    getMenu(token) {
        return makeRequest(token, 'GET', this.path)
    }
    parse(data) {
        return axios.post(`${process.env.REACT_APP_PARSER_HOST}/add_menu`, data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }
    createMenu(token, data) {
        return makeRequest(token, 'POST', this.path, data)
    }

    clearMenu(token, menuId) {
        return makeRequest(token, 'DELETE', `http://localhost:2000/categories/clear/by-menu/${menuId}`)
    }

}

export default new MenuService()