import { Methods, makeRequest } from '../config'

class MediaService {
    private readonly path = 'api/v1/files'

    public async upload(token:string, data:object) {
        return await makeRequest(token, Methods.POST, `${import.meta.env.VITE_MEDIA_HOST}/${this.path}/upload`, data, {'Content-Type': 'multipart/form-data'})
    }
    public getFile(id:string) {
        return `${import.meta.env.VITE_MEDIA_HOST}/${this.path}/download?id=${id}`
    }
}


export default new MediaService()