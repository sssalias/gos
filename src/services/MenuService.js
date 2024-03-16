import {makeRequest} from "./index"
import axios from "axios";

class MenuService {

    path = '/menu'
    getMenu(token) {
        return makeRequest(token, 'GET', this.path)
    }
    parse(data) {
        return axios.post('http://5.145.160.142:2024/add_menu', data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }

}

export default new MenuService()