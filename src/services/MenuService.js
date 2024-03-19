import {HOST, makeRequest} from "./index"
import axios from "axios";

class MenuService {

    path = '/menu'
    getMenu(token) {
        return makeRequest(token, 'GET', this.path)
    }
    parse(data) {
        return axios.post(`http://${HOST}:2024/add_menu`, data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }
    createMenu(token, data) {
        return makeRequest(token, 'POST', this.path, data)
    }

}

export default new MenuService()