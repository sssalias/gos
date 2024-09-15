import { Methods, makeRequest } from '../config'

class DishService {

    private readonly path = '/dishes'

    public async get(token:string, id:string) {
        return await makeRequest(token, Methods.GET, `${this.path}/category/${id}`)
    }

    public async create(token:string, data:any, categoryId:string) {
        return await makeRequest(token, Methods.POST, this.path, {...data, categoryId})
    }

    public async del(token:string, id:string) {
        return await makeRequest(token, Methods.DELETE, `${this.path}/${id}`)
    }
    public async update(token:string, data:any) {
        return await makeRequest(token, Methods.PUT, this.path, data)
    }
}

export default new DishService()