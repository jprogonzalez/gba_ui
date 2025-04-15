import Api from './api';

export default {
    store(contactId,data) {
        return Api.post("/contacts/"+contactId+"/tutors",data);
    },
    show(id){
        return Api.get("/tutors/"+id);
    },
    update(id,data) {
        return Api.put("tutors/"+id,data);
    },
    destroy(id) {
        return Api.delete('/tutors/'+id);
    }
}