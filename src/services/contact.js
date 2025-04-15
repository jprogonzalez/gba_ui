import Api from './api';

export default {
    index(query) {
        return Api.get('/contacts',query);
    },
    store(data) {
        return Api.post("/contacts",data);
    },
    show(id){
        return Api.get("/contacts/"+id);
    },
    update(id,data) {
        return Api.put("contacts/"+id,data);
    },
    destroy(id) {
        return Api.delete('/contacts/'+id);
    }
}