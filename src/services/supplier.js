import Api from './api';

export default {
    index(query) {
        return Api.get('/suppliers',query);
    },
    store(data) {
        return Api.post("/suppliers",data);
    },
    show(id){
        return Api.get("/suppliers/"+id);
    },
    update(id,data) {
        return Api.put("suppliers/"+id,data);
    },
    destroy(id) {
        return Api.delete('/suppliers/'+id);
    }
}