<template>
    
</template>

<script>
import DeleteConfirmation from './DeleteConfirmation.vue';

export default {
    components:{
        DeleteConfirmation
    },
    data() {
        return {
            apiService:null,
            waitingResponse:false,
            deleteModal:false,
            itemToDelete:null,
        }
    },
    methods:{
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
        async destroy() {
            this.waitingResponse = true;
            try {

                var response = await this.apiService.destroy( this.itemToDelete.id );
                
                VueEvent.fire("delete-confirmation",this.itemToDelete.id);

                this.successSnackbar(response.message);

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
            this.itemToDelete = item;
            this.deleteModal = true;
        },
    }

}
</script>