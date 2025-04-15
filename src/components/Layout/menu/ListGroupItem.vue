<template>
    <v-list-group :value="false" no-action :prepend-icon="item.icon" :key="item.title">
        <template v-slot:activator>
            <v-list-item-content>
                <ListItemTitle :title="item.title" />
            </v-list-item-content>
        </template>
        <ListItem
            @fetch="$emit('fetch',subitem.to)"
            :item="subitem" 
            v-for="subitem in item.children"
            
            :key="subitem.title"/>
    </v-list-group>
</template>

<script>
import ListItemTitle from './ListItemTitle.vue';
import ListItem from './ListItem.vue';

export default {
    components:{
        ListItemTitle,
        ListItem
    },
    props:{
        item:{
            type:Object,
            required:true
        }
    }
}
</script>