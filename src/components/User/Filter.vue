<template>
    <v-container class="">
        <portal :to="portalKey" v-if="portalKey">
            <v-toolbar flat color="white" dense>
                <v-btn @click="closeDrawer" icon>
                    <v-icon color="grey darken-2">mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title class="grey--text text--darken-2 text-button text-uppercase">
                    {{title}}
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn
                    class="blue-grey darken-4 white--text"
                    
                    depressed
                    @click="filter"
                >
                    Filtrar
                </v-btn>
            </v-toolbar>
        </portal>

        <v-card class="elevation-3 pa-7 rounded-lg mb-12 mb-xl-0 mb-lg-0">
            <v-row>
                <v-col cols="12" lg="6" xl="6">
                    <RoleField 
                        multiple
                        rules="" 
                        v-model="form.role" 
                        name="role" 
                        label="Roles" 
                    />
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import RoleField from "../Common/Fields/Role.vue";


export default {
    components:{
        RoleField
    },
    props:{
        portalKey:{},
        title:{},
        currentFilters:{}
    },
    data() {
        return {
            form:{
                role:null
            }
        }
    },
    methods:{
        filter() {
            VueEvent.fire("employee-filter",this.form);
            this.closeDrawer();
        }
    },
    mounted() {
        this.form = this.currentFilters;
    }
}
</script>