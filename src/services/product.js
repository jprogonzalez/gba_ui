import Api from './api';

export default {
    index(query) {
        return Api.get('/products',query);
    },
    store(data) {
        return Api.post("/products",data);
    },
    show(id){
        return Api.get("/products/"+id);
    },
    update(id,data) {
        return Api.put("products/"+id,data);
    },
    updateMinStock(id,inventory) {
        return Api.put('/products/'+id+'/inventory',inventory);
    },
    destroy(id) {
        return Api.delete('/products/'+id);
    }
}