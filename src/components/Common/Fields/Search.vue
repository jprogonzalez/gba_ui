<template>
    <v-text-field
        v-model="input"
        :append-icon="appendIcon"
        :label="label"
        outlined
        dense
        clearable
        hide-details="auto"
        color="blue-grey darken-4"
        class="white pa-0 ma-0"
    ></v-text-field>
</template>

<script>
import TextInput from './Renderless/TextInput.vue';
export default {
    extends:TextInput,
    props:{
        appendIcon:{
            type:String,
            default:"mdi-magnify"
        }
    }
}
</script>