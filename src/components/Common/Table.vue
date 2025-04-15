<template>
</template>
<script>
import {isEqual , cloneDeep} from 'lodash';
import TableFooter from './TableFooter.vue';

export default {
    components:{
        TableFooter
    },
    data() {
        return {
            apiService:null,
            items:[],
            item:{},
            fetchDataFromId:false,
            showNextPage:0,
            createdEvent:null,
            updatedEvent:null,
            destroyEvent:null,
            query:{
                pattern:"",
                template:""
            },
            itemsPerPageOptions:[5,10,15,25,50,100],
            deleteModal:false,
            itemToDelete:null,
            sortBy:null,
            sortDesc:true,
            pagination:{
                page:1,
                itemsPerPage:15,
                groupBy:[],
                groupDesc:[],
                multiSort:false,
                mustSort:true,
            },
            filtering:false,
            serverItemsLength:0,
            waitingResponse:false,
            query:{

            },
            shallow:false,
            totalGetItems:0
        }
    },
    watch:{
        paginationParams:{
            handler:function(params,old){
                if (isEqual(params,old)) {
                    return;
                }
                this.getItems();
            },
            deep:true
        },
        queryParams:{
            handler(params,old) {
                if (isEqual(params,old)) {
                    return;
                }
                if (this.pagination.page == 1) {
                    this.getItems();
                }else{
                    this.pagination.page = 1;
                }
            },
            deep:true
        }
    },
    computed:{
        paginationParams() {
            var sortBy = Array.isArray(this.sortBy)
                ? this.sortBy[0]
                : this.sortBy;
            return {
                sort_by:sortBy,
                sort_direction:this.sortDesc ? 'desc' : 'asc',
                per_page:this.pagination.itemsPerPage,
                page:this.pagination.page
            };
        },
        queryParams() {
            var params = {};
            for(let field in this.query) {
                if (Array.isArray(this.query[field]) ) {
                    if (this.query[field].length > 0) {
                        params[field] = this.query[field].join(",");
                    }else{
                        params[field] = null;
                    }
                }else{
                    params[field] = this.query[field];
                }
            }
            return params;
        },
        hasEmptyState() {
            if (this.waitingResponse) {
                return false;
            }
            return this.totalGetItems <= 1 && this.items.length == 0;
        },
        itemId() {
            return this.id;
        }
    },

    methods:{
        successCallback(response){},
        processError(error) {
            if (error.message) {
                this.errorSnackbar(error.message);
            }
            if (error.response) {
                this.errorSnackbar(error.response.data.message);
            }
            if (error.errors) {
                this.searchErrors(error);
            }
        },
        async getItems() {
            try {

                if (!this.apiService) {
                    console.log("No api service declared");
                }

                var queryData = JSON.parse(JSON.stringify(this.query));

                this.waitingResponse = true;

                var params = {
                    ...this.paginationParams,
                    ...this.queryParams
                }

                params = {
                    params:params
                }

                var response = {};
                if (this.shallow){
                    response = await this.apiService.index(this.shallowId,params);
                }
                if (!this.shallow) {
                    response = await this.apiService.index(params);
                }

                this.totalGetItems++;

                this.items = response.data;

                this.successCallback(this.items);

                this.serverItemsLength = response.meta
                    ? response.meta.total
                    : this.items.length;

                if (this.items.length >= this.paginationParams.per_page) {
                    this.showNextPage = 100000000;
                }else{
                    this.showNextPage = this.paginationParams.per_page * this.paginationParams.page - 1;
                }

            } catch (error) {
                this.processError(error);
            }

            this.waitingResponse = false;
        },
        async getItem(){
            this.waitingResponse = true;
            try{
                var response = await this.apiService.show(this.itemId);
                this.item = response.data;
            }catch(error){
                this.processError(error);
            }
            this.waitingResponse = false;
        },
        async destroy() {
            this.waitingResponse = true;
            try {

                var response = await this.apiService.destroy( this.itemToDelete.id );

                this.items = this.items.filter((item) => item.id != this.itemToDelete.id);

                this.successSnackbar(response.message);

                this.items = this.items.filter((item) => {
                    return !this.items.includes(item.id);
                });

                this.serverItemsLength--;

            } catch (error) {
                const snackbarMessage =
                    error.response?.message || error.message;

                if (snackbarMessage) {
                    this.errorSnackbar(snackbarMessage);
                }
            }
            this.deleteModal = false;
            this.waitingResponse = false;
        },
        showDeleteModal(item = null) {
            console.log(item);
            this.itemToDelete = item;
            this.deleteModal = true;
        },
        addNewItem(item){
            this.items.unshift(item);
        },
        updateItem(itemUpdated) {
            this.items = this.items.map(item => {
                if (item.id === itemUpdated.id) {
                    item = itemUpdated;
                }
                return item;
            });
        },
        deleteItem(payload) {
            this.items = this.items.filter(item => item.id !== payload.id);
        },
        applyFilters(filterForm) {
            let filterFormKeys = Object.keys(filterForm);
            
            filterFormKeys.forEach((key) => {
                this.query[key] = filterForm[key];
            });

            this.filtering = true;
        },
    },

    mounted() {

        this.getItems();

        if (this.fetchDataFromId){
            this.getItem();
        }

        VueEvent.listen(this.createdEvent,this.addNewItem);
        VueEvent.listen(this.updatedEvent,this.updateItem);
        VueEvent.listen(this.destroyEvent,this.deleteItem);
    },

}
</script>
