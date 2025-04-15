<template>
    <v-app-bar 
        data-cy="app-bar" 
        app 
        dense
        color="white" 
        class="elevation-0"
    >
        
        <v-app-bar-nav-icon data-cy="bar-button" @click="drawer = !drawer" />

        <v-spacer></v-spacer>
        
       

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    text
                    v-bind="attrs"
                    v-on="on"
                    class="d-flex align-center justify-space-between text-capitalize"
                    :loading="waitingResponse"
                >
                    <!-- Bloque con icono o iniciales y detalles del usuario -->
                    <div class="d-flex align-center">
                        <!-- Ícono o iniciales del usuario -->
                        <div
                            class="d-flex align-center justify-center rounded-circle"
                            style="width: 40px; height: 40px; background-color: #f5f5f5; color: #000; font-size: 14px;"
                        >
                            <v-icon size="35">mdi-account</v-icon>
                        </div>
                        
                        <!-- Detalles del usuario -->
                        <div class="d-none d-xl-flex d-lg-flex d-md-flex flex-column align-start ml-3">
                            <span class="caption font-weight-light grey--text text--darken-2">
                                {{ userActive.name }} {{ userActive.last_name }}
                            </span>
                            
                        </div>
                    </div>
                
                    <!-- Ícono de menú -->
                    <v-icon class="ml-2"  color="grey darken-1">mdi-chevron-down</v-icon>
                </v-btn>
            </template>

            <v-card width="350" class="elevation-3 pa-0 rounded-lg">
                <v-card-title class="d-flex align-center justify-center flex-column  ">
                    <div
                        class="d-flex align-center justify-center rounded-circle"
                        style="width: 40px; height: 40px; background-color: #f5f5f5; color: #000; font-size: 14px;"
                    >
                        <v-icon>mdi-account</v-icon>
                    </div>
                    <span class="caption font-weight-medium">
                        {{ userActive.name }} 
                        {{ userActive.last_name }}
                    </span>
                    <span class="caption font-weight-light grey--text text--darken-2">
                        {{userActive?.email}}
                    </span>
                </v-card-title>

                <v-divider class="pa-2"></v-divider>

                <v-list nav>
                    <v-list-item-group>
                        <template v-for="item in menu">
                            <v-list-item 

                                :key="item.title"
                                @click="item.click"
                                class="d-flex align-center"
                                dense
                                :disabled="item.disabled"
                            >
                                <v-list-item-icon class="pr-0 mr-2">
                                    <v-icon class="grey--text text--darken-2">{{item.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-light">
                                        {{item.title}}
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action v-if="item.chip">
                                    <v-chip small class="grey" text-color="white">
                                        {{item.chip}}
                                    </v-chip>
                                </v-list-item-action>
                            </v-list-item> 
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
import AuthService from "../../services/auth";
import { moneyFormat } from '../../utils/helpers';
import sessions  from "../../utils/sessions";

export default {
    mixins:[moneyFormat,sessions],
    props:{
        value: {},
    },
    watch: {
        drawer:{
            immediate: true,
            handler: function(value){
                this.$emit("input", this.drawer);
            }
        },
        value(value) {
            if (this.value != this.drawer) {
                this.drawer = this.value;
            }
        },
    },
    data() {
        return {
            drawer: this.value,
            apiService:AuthService,
            accountMenu:false,
            waitingResponse:false,
            menu:[
                {
                    title:"Cerrar Sesión",
                    icon:"mdi-logout",
                    permissions:"*",
                    click:() => {
                        this.logout();
                    }
                }
            ]
        }
    },
    methods:{
        
        async logout(){
            this.waitingResponse = true;
            try {
                await this.apiService.logout();
                this.clearSession();
                this.$router.replace({ name: "login" });
            }catch(error) {
            }
            this.waitingResponse = false;
           
        },
    },
    mounted(){
    }
}
</script>