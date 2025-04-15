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

                    <v-spacer></v-spacer>

                    <v-btn
                        :disabled="!valid"
                        :loading="waitingResponse"
                        class="primary--bg white--text"
                        
                        depressed
                        @click="handleSubmit(prepareDataForSubmitForm)"
                    >
                        guardar
                    </v-btn>
                </v-toolbar>
            </portal>

            <v-card class="elevation-3 pa-7 rounded-lg mb-12 mb-xl-0 mb-lg-0">
                <v-row>
                    <v-col cols="12">
                        <NameField 
                            rules="required" 
                            v-model="form.name" 
                            name="nombre" 
                            label="Nombre" />
                    </v-col>
                    <v-col cols="12">
                        <NameField 
                            rules="required" 
                            v-model="form.last_name" 
                            name="apellido" 
                            label="Apellido" 
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <NameField 
                            rules="email|required" 
                            v-model="form.email" 
                            name="email" 
                            label="Correo electronico" 
                        />
                    </v-col>
                    <v-col cols="12">
                        <NameField 
                            rules="required" 
                            type="password" 
                            v-model="form.password" 
                            name="password" 
                            label="Contraseña" 
                        />
                    </v-col>
                    <v-col cols="12">
                        <NameField 
                            rules="required" 
                            type="password" 
                            v-model="form.password_confirmation" 
                            name="password" 
                            label="Confirmar Contraseña" 
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <RoleField 
                            :multiple="false"
                            rules="required" 
                            v-model="form.role_id" 
                            name="Rol" 
                            label="Rol de usuario" 
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <span class="subtitle-1 font-weight-medium">Campos personalizados</span>
                    </v-col>
                </v-row>
                <v-row class="align-center d-flex">
                    <v-col cols="5">
                        <NameField 
                            rules="required" 
                            type="" 
                            v-model="custom_field.title" 
                            :name="custom_field.title" 
                            :label="custom_field.title" 
                        />
                    </v-col>
                    <v-col cols="5">
                        <NameField 
                            rules="" 
                            type="" 
                            v-model="custom_field.value" 
                            :name="custom_field.value" 
                            :label="custom_field.value" 
                        />
                    </v-col>
                    <v-col cols="2" class="text-end">
                        <v-btn icon large @click="addNewCustomField">
                            <v-icon large>mdi-plus-circle</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" v-for="(custom_field,index) in metadata.custom_fields" :key="index"  >
                        <v-card class="pa-4" outlined>
                            <v-row class="d-flex align-center">
                                <v-col cols="3">
                                    <span class="subtitle-2" > {{custom_field.title}}</span>
                                </v-col>

                                <v-col cols="9">
                                    <NameField 
                                        rules="" 
                                        type="" 
                                        v-model="custom_field.value" 
                                        :name="custom_field.title" 
                                        :label="custom_field.title" 
                                    />
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
        title:{}
    },
    watch:{
    },
    data() {
        return {
            apiService:UserService,
            createdEvent:"user-create",
            form:{
                name:"",
                last_name:"",
                email:"",
                password:"",
                password_confirmation:"",
                role_id:null,
                metadata:{
                    
                }
            },
            metadata:{
                custom_fields:[
                    {
                        title:"Telefono",
                        value:""
                    }
                ]
            },
            custom_field:{
                title:"nuevo campo personalizado",
                value:""
            }
        }
    },
    methods:{
        prepareDataForSubmitForm() {
            const customFields = {};

            this.metadata.custom_fields.forEach(field => {
                customFields[field.title] = field.value;
            });

            this.form.metadata['custom_fields'] = customFields;

            this.submit();

        },
        addNewCustomField() {
            
            this.metadata.custom_fields.unshift({
                title:this.custom_field.title,
                value:this.custom_field.value
            });

            this.custom_field.title="nuevo campo personalizado";
            this.custom_field.value = "";
        }
    }

}
</script>