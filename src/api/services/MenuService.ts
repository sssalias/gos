import axios from 'axios'
import { Methods, makeRequest } from '../config'

class MenuService {
    private readonly path = '/menu'

    public async get(token:string) {
        return await makeRequest(token, Methods.GET, this.path)
    }

    public async create(token:string, data:object) {
        return await makeRequest(token, Methods.POST, this.path, data)
    }

    public async clear(token:string, menuId:string) {
        return await makeRequest(token, Methods.DELETE, `/categories/clear/by-menu/${menuId}`)
    }

    public async parse(token:string, data:object) {
        return axios.post(`${import.meta.env.VITE_PARSER_HOST}/api/v1/parser/parse`, data, {headers: {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`}})
    }
}


export default new MenuService()
