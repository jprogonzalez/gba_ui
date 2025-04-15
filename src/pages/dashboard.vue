<template>
    <v-row>
        <v-col cols="6">
            <UserStats
                :usersStateAPI="userStats"
                :loading="waitingResponse"
            />
        </v-col>
    </v-row>
  
</template>

<script>

import Api from "../services/api";
import UserStats from '../components/Dashboard/UserStats.vue'


export default {
    name: 'App',
    mixins:[],
    components: {
        UserStats
    },
    data() {
        return {
            userStats:{},
            waitingResponse:false,
        }
    },
    methods:{
        async fetchUsersStats() {
            this.waitingResponse = true;
            try {

                let response = await Api.get('/dashboard/summary');
                
                this.userStats = response.data;

            }catch(error) {
                alert(error);
            }
            this.waitingResponse = false;
        }
    },
    mounted() {
        this.fetchUsersStats();
    }
}
</script>