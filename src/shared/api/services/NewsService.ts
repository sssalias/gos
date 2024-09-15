import { Methods, makeRequest } from '../config'

class NewsService {

    private readonly path = '/news'
    // ------------------------- group api -------------------------------------------
    public async createForGroup(token:string, data: any) {
        return await makeRequest(token, Methods.POST, `${this.path}/group/send`, data)
    }
    public async getForGroup(token: string) {
        return await makeRequest(token, Methods.GET, `${this.path}/group`)
    }
    public async deleteForGroup(token: string, id: string) {
        return await makeRequest(token, Methods.DELETE, `${this.path}/group/${id}`)
    }
    // ------------------------- personal api -----------------------------------------
    public async createPersonal(token:string, data: any) {
        return await makeRequest(token, Methods.POST, `${this.path}/personal/send`, data)
    }
    public async getPersonal(token: string) {
        return await makeRequest(token, Methods.GET, `${this.path}/personal`)
    }
    public async deletePersonal(token: string, id: string) {
        return await makeRequest(token, Methods.DELETE, `${this.path}/personal/${id}`)
    }
}

export default new NewsService()