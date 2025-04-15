import Api from './api';

export default {
    index(query) {
        return Api.get('/footwears',query);
    },
    store(data) {
        return Api.post("/footwears",data);
    },
    show(id) {
        return Api.get('/footwears/'+id);
    },
    destroy(id){
        return Api.delete('/footwears/'+id);
    }
}