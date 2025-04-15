import Api from './api';

export default {
    index(query) {
        return Api.get('/purchases',query);
    },
    store(data) {
        return Api.post("/purchases",data);
    },
    show(id){
        return Api.get("/purchases/"+id);
    },
    destroy(id) {
        return Api.delete('/purchases/'+id);
    }
}