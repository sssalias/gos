import {makeRequest} from "./index";

class AppealsService {

    path = '/appeals'

    getAppeals(token) {
        return makeRequest(token,'GET', this.path)
    }

    deleteAppeal(token, id) {
        return makeRequest(token, 'DELETE', `${this.path}/${id}`)
    }

}


export default new AppealsService()
