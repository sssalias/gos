import { Methods, makeRequest } from '../config'

class CategoriesService {
    private path = `/categories`

    public async get(token:string, id:string) {
        return await makeRequest(token, Methods.GET, `${this.path}/menu/${id}`)
    }
    public async create(token:string, title:string, menuId:string) {
        return await makeRequest(token, Methods.POST, this.path, {title, menuId})
    }
    public async del(token:string, id:string) {
        return await makeRequest(token, Methods.DELETE, `${this.path}/${id}`)
    }
}


export default new CategoriesService()