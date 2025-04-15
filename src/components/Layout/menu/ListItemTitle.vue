<template>
    <v-list-item-title class="font-weight-medium subtitle-2">{{title}}</v-list-item-title>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            required:true
        }
    }
}
</script>