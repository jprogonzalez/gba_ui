<template>
    <ValidationProvider v-slot="{errors}" :name="name" :rules="rules">
        <v-autocomplete 
            v-model="input"
            :loading="waitingResponse"
            :items="items"
            :label="label"
            item-value="id"
            item-text="translate_name"
            dense
            :multiple="true"
            :error-messages="errors"
            outlined
            chips
            clearable
            hide-details="auto"
        ></v-autocomplete>
    </ValidationProvider>
</template>

<script>
import TextInput from './Renderless/TextInput.vue';
import Api from "../../../services/api";
export default {
    extends:TextInput,
    data() {
        return {
            waitingResponse:false,
            items:[]
        }
    },
    methods: {
        async getItems() {
            this.waitingResponse = true;
            try {
                let response = await Api.get("/permissions");

                this.items = response.data;

            }catch(error){
                alert("error");
            }
            this.waitingResponse = false;
        }
    },
    mounted() {
        this.getItems();
    }
}
</script>