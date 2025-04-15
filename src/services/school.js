import Api from './api';

export default {
    index(query) {
        return Api.get('/schools',query);
    },
    store(data) {
        return Api.post('/schools',data);
    },
    show(id){
        return Api.get('/schools/'+id);
    },
    destroy(id) {
        return Api.delete('/schools/'+id);
    }   
}