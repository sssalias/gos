import { Methods, makeRequest } from '../config'

class AppealsService {
    private readonly path = '/appeals'

    public async get(token:string) {
        return await makeRequest(token, Methods.GET, this.path)
    }

    public async del(token: string, id:string) {
        return await makeRequest(token, Methods.DELETE, `${this.path}/${id}`)
    }

    public async sendFeedback(token:string, id:string, body:any) {
        return await makeRequest(token, Methods.POST, `${this.path}/${id}/feedback`, {body})
    }

    public async updateStatus(token:string, id:string, status:string) {
        return await makeRequest(token, Methods.PUT, this.path, {id, status})
    }
    public async sendComment(token:string, id:string, data:any) {
        return await makeRequest(token, Methods.POST, `${this.path}/${id}/comment`, data)
    }
}


export default new AppealsService()