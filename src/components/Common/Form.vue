<template>
</template>

<script>
export default {
    data() {
        return {
            apiService:null,
            form:{},
            createdEvent:null,
            updatedEvent:null,
            closeAfterStore:true,
            destroyEvent:null,
            fetchDataFromId:false,
            requiredFetchItem:false,
            waitingResponse:false,
            lifeEvents:true,
            shallow:false,
            shallowId:null,
            deleteModal:false,
            itemToDelete:null,
            needSuccessCallBack:true
        }
    },
    computed:{
        itemId() {
            var itemId = this.item ? this.item.id : null;
            if (this.id || itemId) {
                return this.id ? this.id : this.item.id;
            }
            return null;
        },
        isPostAction() {
            return this.itemId ? false : true;
        }
    },
    methods: {
        successCallback(response){},
        getErrorValidationOnResponse(response) {
            var errors = {};
            if (response.errors) {
                errors = response.errors;
            }
            if (response.data){
                if (response.data.errors) {
                    errors = response.data.errors;
                }
            }
            return errors;
        },
        searchErrors(response) {
            var errors = this.getErrorValidationOnResponse(response);
            for(var field in errors) {
                var error = errors[field][0];
                var data  = {};
                data[field] = error;
                this.$refs.veeValidateObserver.setErrors(data);
            }
        },
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
        async submit() {
            this.waitingResponse = true;
            try {

                var response = null;
                if (this.isPostAction && this.shallow) {
                    response = await this.apiService.store(this.shallowId,this.form);
                }

                if (this.isPostAction && !this.shallow) {
                    response = await this.apiService.store(this.form);
                }

                if (!this.isPostAction) {
                    response = await this.apiService.update(this.itemId,this.form);
                }

                if (response) {
                    var event = this.isPostAction ? this.createdEvent : this.updatedEvent;
                    event ? VueEvent.fire(event,response.data) : null;
                }

                this.successSnackbar(response.message);
                
                if (this.needSuccessCallBack) { 
                    this.successCallback(response.data);  
                }

                if (this.closeAfterStore) {
                    this.closeDrawer();
                }

            } catch (error) {
                this.processError(error);
            }
            this.waitingResponse = false;
        },
        async getItem() {
            this.waitingResponse = true;
            try{
                let result = await this.apiService.show(this.id,{
                    params:{
                        template:this.template ?? null
                    }
                });
                this.successCallback(result.data);
            }catch(error){
                this.processError(error);
            }
            this.waitingResponse = false;
        },
        async destroy() {
            this.waitingResponse = true;
            try {

                var response = await this.apiService.destroy( this.itemToDelete.id );

                this.successSnackbar(response.message);

                this.closeDrawer();

                VueEvent.fire(this.destroyEvent,{id:this.id});

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
        showDeleteModal() {
            this.itemToDelete = this.form;
            this.deleteModal = true;
        },
    },
    mounted() {
        if (this.fetchDataFromId) {
            this.getItem();
        }
    },
}
</script>