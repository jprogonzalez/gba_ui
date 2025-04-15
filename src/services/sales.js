import Api from './api';

export default {
    index(query){
        return Api.get("sales",query);
    },
    stats() {
        return Api.get('stats-orders');
    },
    
    store(data) {
        let selectedBranch = JSON.parse(localStorage.getItem("cdp-branch-selected"));
        data['branch_id'] = selectedBranch?.id;
        return Api.post("/sales",data);
    },
    nextTransition(id,form){ 
        return Api.put('sales/'+id+'/next-transition',form);
    },
    aprovePayment(id) {
        return Api.put('orders/'+id+"/aprove-payment");
    },
    deliveryProducts(id) {
        let selectedBranch = JSON.parse(localStorage.getItem("cdp-branch-selected"));
        return Api.put('sales/'+id+"/delivery-products",{
            current_branch_id:selectedBranch?.id
        });
    }
}