import Api from './api';

export default {
    index(query) {
        return Api.get('/banks',query);
    },
    store(data) {
        return Api.post("/banks",data);
    },
    destroy(id) {
        return Api.delete('/banks/'+id);
    }
}