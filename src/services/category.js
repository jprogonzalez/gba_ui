import Api from './api';

export default {
    index(query) {
        return Api.get('/categories',query);
    },
    store(data) {
        return Api.post("/categories",data);
    },
    show(id){
        return Api.get("/categories/"+id);
    },
    update(id,data) {
        return Api.put("categories/"+id,data);
    },
    destroy(id) {
        return Api.delete('/categories/'+id);
    }
}