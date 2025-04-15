import Api from './api';

export default {
    index(query) {
        return Api.get('/members',query);
    },
    basicFields(query) {
        return Api.get("basic-fields/people",query);
    },
    store(data) {
        return Api.post("/globals/post/data-entry/add-new-member",data);
    }
}