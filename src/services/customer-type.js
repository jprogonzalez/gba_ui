import Api from './api';

export default {
    index(query) {
        return Api.get('/customer-types',query);
    },
    store(data) {
        return Api.post("/customer-types",data);
    },
    destroy(id) {
        return Api.delete('customer-types/'+id);
    }
}