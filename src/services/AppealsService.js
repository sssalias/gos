import {makeRequest} from "./index";

class AppealsService {

    path = '/appeals'

    getAppeals(token) {
        return makeRequest(token,'GET', this.path)
    }

    deleteAppeal(token, id) {
        return makeRequest(token, 'DELETE', `${this.path}/${id}`)
    }

    sendFeedback(token, id, body) {
        return makeRequest(token, 'POST', `${this.path}/${id}/feedback`, {body})
    }
}


export default new AppealsService()
