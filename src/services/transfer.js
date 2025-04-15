import Api from './api';

export default {
    index(query) {
        return Api.get('/transfers',query);
    },
    store(data) {
        return Api.post("/transfers",data);
    },
    update(transfer,data) {
        return Api.put("transfers/"+transfer,data);
    },
    received(transfer,data){
        return Api.put("transfers/"+transfer+"/received",data);
    },
    restocking(transfer,data) {
        return Api.put("transfers/"+transfer+"/restocking",data);
    },
    updateStatus(transfer,status) {
        return Api.patch("transfers/"+transfer+"/"+status+"/status");
    },
    show(id){
        return Api.get("/transfers/"+id);
    },
    destroy(id) {
        return Api.delete('/transfers/'+id);
    }
}