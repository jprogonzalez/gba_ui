<template>
    <ValidationProvider v-slot="{errors}" :name="name" :rules="rules">
        <v-autocomplete 
            v-model="input"
            :items="items"
            :label="label"
            item-value="id"
            item-text="name"
            dense
            :loading="loading"
            :error-messages="errors"
            outlined
            clearable
            hide-details="auto"
            :multiple="multiple"
        ></v-autocomplete>
    </ValidationProvider>
</template>

<script>
import TextInput from './Renderless/TextInput.vue';

export default {
    extends:TextInput,
    data() {
        return {
            items:[
                {
                    id:1,
                    name:"Administrador"
                },
                {
                    id:2,
                    name:"Colaborador"
                }
            ]
        }
    }
}
</script>