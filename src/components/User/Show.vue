<template>
    <ValidationObserver ref="veeValidateObserver" v-slot="{ handleSubmit, valid }">
        <v-container>
            <portal :to="portalKey" v-if="portalKey">
                <v-toolbar flat color="white" dense>
                    <v-btn @click="closeDrawer" icon>
                        <v-icon color="grey darken-2">mdi-close</v-icon>
                    </v-btn>

                    <v-toolbar-title
                        class="grey--text text--darken-2 text-button text-uppercase"
                    >
                        {{title}}
                    </v-toolbar-title>

                   
                </v-toolbar>
            </portal>

            <v-skeleton-loader type="table" v-if="waitingResponse"></v-skeleton-loader>

            <v-card v-else class="elevation-3 pa-7 rounded-lg mb-3">
                <v-card-title>
                    <div class="d-flex align-center">
                        <v-icon size="50" class="mr-2">mdi-account-circle</v-icon>
                        

                        <div class="d-flex flex-column align-start">
                            <span class="font-weight-medium ">{{form.name}} {{form.last_name}}</span>

                            <div class="d-flex align-center pa-2">
                                <v-chip label small class="mr-2">
                                    {{form.email}}
                                </v-chip>
                                <v-chip :class="form.status ? 'green' : 'red'" dark label small class="mr-2 font-weight-bold lighten-2">
                                    <v-icon small class="mr-1">
                                        {{form.status ? 'mdi-check-circle' :'mdi-close-circle'}}
                                    </v-icon>
                                    {{form.status ? 'Activo' : 'Inactivo'}}
                                </v-chip>
                                <v-chip :class="form?.role?.key == 'admin' ? 'primary--bg' : 'orange'" dark label small class="mr-2 lighten-2 text-capitalize">
                                    {{form.role?.name}}
                                </v-chip>
                        
                            </div>
                        
                        </div>
                    </div>
                </v-card-title>
            </v-card>

            <v-card v-if="form.metadata" class="elevation-3 pa-7 rounded-lg mb-12 mb-xl-0 mb-lg-0">
               <v-row>
                    <v-col cols="12" v-for="(custom_field,index) in form.metadata.custom_fields" :key="index"  >
                        <v-card class="pa-4" outlined>
                            <v-row class="d-flex align-center">
                                <v-col cols="3">
                                    <span class="subtitle-2" > {{custom_field.title}}</span>
                                </v-col>

                                <v-col cols="9">
                                    <span class="subtitle-2 font-weight-light" > {{custom_field.value}}</span>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>

        </v-container>
    </ValidationObserver>
</template>

<script>
import Form from "../Common/Form.vue";
import UserService from "../../services/user";

import NameField from "../Common/Fields/Name.vue";
import RoleField from "../Common/Fields/Role.vue";

export default {
    extends:Form,
    components:{
        NameField,
        RoleField
    },
    props:{
        portalKey:{},
        title:{},
        id:{}
    },
    watch:{
    },
    data() {
        return {
            apiService:UserService,
            fetchDataFromId:true,
            form:{
                name:"",
                last_name:"",
                email:"",
                password:"",
                password_confirmation:"",
                role_id:null,
                metadata:{
                    custom_fields:[
                        {
                            title:"Telefono",
                            value:""
                        }
                    ]
                }
            },
            custom_field:{
                title:"nuevo campo personalizado",
                value:""
            }
        }
    },
    methods:{
        successCallback(data) {
            this.form = data;

            if (this.form.metadata) {
                const custom_fields = Object.entries(this.form.metadata?.custom_fields).map(([key, value]) => ({
                    title: key,
                    value
                }));

                this.form.metadata['custom_fields'] = custom_fields;
            }

            
        },
        prepareDataForSubmitForm() {
            const customFields = {};

            this.form.metadata.custom_fields.forEach(field => {
                customFields[field.title] = field.value;
            });

            this.form.metadata.custom_fields = customFields;

            console.log(this.form);

            this.submit();

        },
        addNewCustomField() {
            
            this.form.metadata.custom_fields.unshift({
                title:this.custom_field.title,
                value:this.custom_field.value
            });

            this.custom_field.title="nuevo campo personalizado";
            this.custom_field.value = "";
        }
    }

}
</script>