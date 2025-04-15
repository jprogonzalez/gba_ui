import Api from './api';

export default {
    index(query) {
        return Api.get('/branches',query);
    },
    store(data) {
        return Api.post("/branches",data);
    },
    show(id,params){
        return Api.get("/branches/"+id,params);
    },
    update(id,data) {
        return Api.put("branches/"+id,data);
    },
    inactivateOrActivateBranch(id) {
        return Api.put('branches/'+id+"/inactivate-for-inventory");
    },
    destroy(id) {
        return Api.delete('/branches/'+id);
    }
}