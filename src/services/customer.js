import Api from './api';

export default {
    index(query) {
        return Api.get('/customers',query);
    },
    store(data) {
        return Api.post("/customers",data);
    },
    show(id) {
        return Api.get("/customers/"+id);
    },
    update(id,data) {
        return Api.put("/customers/"+id,data);
    },
    destroy(id) {
        return Api.delete("/customers/"+id);
    }
}