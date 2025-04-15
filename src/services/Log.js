import Api from './api';

export default {
    index(query) {
        return Api.get("/student-logs",query);
    },
    store(contactId,data) {
        return Api.post("/contacts/"+contactId+"/student-logs",data);
    },
    show(id){
        return Api.get('student-logs/'+id);
    },
    update(id,data) {
        return Api.put("student-logs/"+id,data);
    },
    updateMany(data) {
        return Api.put('students-logs/update-many',data);
    },
    destroy(id) {
        return Api.delete("student-logs/"+id);
    }
}