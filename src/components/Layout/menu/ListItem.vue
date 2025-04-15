<template>
    <v-list-item :key="item.title"  @click="$emit('fetch',item.to)">
        <v-list-item-icon v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <ListItemTitle :title="item.title" />
    </v-list-item>
</template>
<script>
import ListItemTitle from './ListItemTitle.vue';
export default {
    components:{
        ListItemTitle
    },
    props:{
        item:{
            type:Object,
            required:true
        }
    }
}
</script>