import Api from './api';

export default {
    index(query) {
        return Api.get('/prices',query);
    },
    store(id,data) {
        return Api.post("/products/"+id+"/prices",data);
    },
    show(id){
        return Api.get("/prices/"+id);
    },
    update(id,data) {
        return Api.put("prices/"+id,data);
    },
    destroy(id) {
        return Api.delete('/prices/'+id);
    }
}