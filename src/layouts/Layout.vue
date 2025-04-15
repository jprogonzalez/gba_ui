<template>
    <v-main
        class="grey lighten-3 overflow-hidden"
        height="100%"
        style="position: relative"
    >
        <Snackbar />
        <DrawerManager />
        <MainBar v-model="drawer" />
        <Menu v-model="drawer" />
        <div class="pa-3 grey lighten-3 full-height">
            <router-view></router-view>
        </div>
    </v-main>
</template>

<script>
import DrawerManager from '../components/Layout/DrawerManager.vue';
import Snackbar from '../components/Layout/Snackbar.vue';
import MainBar from '../components/Layout/MainBar.vue';
import Menu from '../components/Layout/Menu.vue';


export default {
    components:{
        Snackbar,
        DrawerManager,
        MainBar,
        Menu
    },
    data() {
        return {
            drawer:true,
            bottomNavigation:false,
            bottomNavigationId:null,
            bottomNavigationMember:{}
        }
    },
    methods:{
        openBottomNavigation(payload) {
            this.bottomNavigation   = true;
            this.bottomNavigationId = payload.id;
            this.bottomNavigationMember = payload;
        }
    },
    mounted() {
        VueEvent.listen("open-bottom-navigation",this.openBottomNavigation);
    }
}
</script>