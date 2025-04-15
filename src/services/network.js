import Api from './api';

export default {
    index(query) {
        return Api.get('/members', query);
    },
    basicFields(query) {
        return Api.get("basic-fields/networks", query);
    }
}