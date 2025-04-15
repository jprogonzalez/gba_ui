<template>
    <v-navigation-drawer  v-model="drawer" app data-cy='layout-menu'>
        <v-list class="pa-1 text-center">
            <v-list-item class="text-center">
                <img style="width:20%" class="mr-2" src="https://res.cloudinary.com/dpdmqwday/image/upload/v1744675444/user-interface_vyythv.png" alt="">
                <span class="text-h5 font-weight-bold">Global Standar</span>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list class="mt-4" nav dense>
            <template v-for="item in items">
                <ListGroupItem
                    v-if="item.children && hasPermissions(item.permissions)"
                    :item="item"
                    :key="item.title"
                    @fetch="fetchAndGoto"
                />
                <ListItem
                    v-else-if="hasPermissions(item.permissions)"
                    :item="item"
                    :key="item.title"
                    @fetch="fetchAndGoto"
                />
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import TopLayout from './menu/TopLayout.vue';
import ListGroupItem from './menu/ListGroupItem.vue';
import ListItem from './menu/ListItem.vue';
import { items } from "@/utils/menu";
import {userProfile} from "../../utils/profile";

export default {
    mixins:[userProfile],
    components:{
        TopLayout,
        ListGroupItem,
        ListItem
    },
    props:{
        value:{},
    },
    computed:{
        activeUser(){
            let profile = JSON.parse(localStorage.getItem('hamptom-user-profile'));
            return profile;
        },
        items() {
           return this.menu;
        },
        currentRouteName() {
            return this.$route.path;
        },
        isSelected() {
            if (this.currentRouteName == '/dashboard') {
                return 'dashboard';
            }
            return "";
        }
    } ,
    watch: {
        value(value) {
            if (value != this.drawer) {
                this.drawer = value;
            }
        },
        drawer() {
            this.$emit("input", this.drawer);
        },
    },
    data() {
        return {
            menu:items,
            drawer:this.value,
            mini:true
        }
    },
    methods:{
        fetchAndGoto(to) {
            let fullPath = this.$route.fullPath;
            if (fullPath == to) {
                VueEvent.fire(`refetch-${to.replaceAll("/", "")}`);
                return;
            }
            this.$router.push({ path: to });
        },
    }
}
</script>