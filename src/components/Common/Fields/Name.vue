<template>
    <ValidationProvider v-slot="{errors}" :name="name" :rules="rules">
        <v-text-field
            v-model="input"
            :label="label"
            outlined
            dense
            clearable
            :loading="loading"
            hide-details="auto"
            :error-messages="errors"
            color="blue-grey darken-4"
            :type="type"
            :placeholder="placeholder"
        ></v-text-field>
    </ValidationProvider>
</template>

<script>
import TextInput from './Renderless/TextInput.vue';
export default {
    extends:TextInput
}
</script>