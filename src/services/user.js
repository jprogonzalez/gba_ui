import Api from './api';

export default {
    index(query) {
        return Api.get('/users',query);
    },
    store(data) {
        return Api.post("/users",data);
    },
    show(id){
        return Api.get("/users/"+id);
    },
    update(id,data) {
        return Api.put("users/"+id,data);
    },
    updateStatus(id) {
        return Api.patch("users/"+id+"/status");
    },
    destroy(id) {
        return Api.delete('/users/'+id);
    }
}