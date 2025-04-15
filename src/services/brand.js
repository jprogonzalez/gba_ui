import Api from './api';

export default {
    index(query) {
        return Api.get('/brands',query);
    },
    store(data) {
        return Api.post("/brands",data);
    },
    show(id){
        return Api.get("/brands/"+id);
    },
    update(id,data) {
        return Api.put("brands/"+id,data);
    },
    destroy(id) {
        return Api.delete('/brands/'+id);
    }
}