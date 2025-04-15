import Api from './api';

export default {
    index(query){
        return Api.get('/quotes',query);
    },
    store(data) {
        return Api.post("/quotes",data);
    }
}