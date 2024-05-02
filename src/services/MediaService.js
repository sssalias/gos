import {makeRequest} from "./index";

class MediaService {

    path = 'api/v1/files'


    uploadFile(token, data) {
        return makeRequest(token, 'POST', `${process.env.REACT_APP_MEDIA_HOST}/${this.path}/upload`, data, {'Content-Type': 'multipart/form-data'})
    }

    getFile(id) {
        return `${process.env.REACT_APP_MEDIA_HOST}/${this.path}/download?id=${id}`
    }
}

export default new MediaService()