import Api from './api';

export default {
    index(query){
        return Api.get("orders",query);
    },
    store(data) {
        return Api.post("/orders",data);
    },
    show(id) {
        return Api.get('/orders/'+id);
    },
    packaged(id,data) {
        return Api.put('orders/'+id+"/packaged",data);
    },
    delivery(id) {
        return Api.patch('orders/'+id+"/delivery");
    },
    updateGuideNumber(id,data){
        return Api.patch('orders/'+id+"/guide-number",data);
    },
    updateAdvancePayment(id,data) {
        return Api.patch('orders/'+id+"/advance-payment",data);
    } ,
    destroy(id){
        return Api.delete('orders/'+id);
    }
}