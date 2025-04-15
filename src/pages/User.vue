<template>
    <div class="full-height mt-2">

        <v-card class="pa-10 rounded-t-2 rounded-b-0 not-bordered" outlined>

            <HeaderPage
                pageTitle="Usuarios disponibles"
                pageSubtitle="Visualiza el directorio disponible de usuarios"
                @add-new="openAddNewUserDrawer"
                :exportItems="false"
            />

            <v-row class="">
                <v-col cols="4">
                    <SearchField  debounced label="Buscar usuarios" v-model="query.pattern" />
                </v-col>
            </v-row>
        </v-card>

        <v-skeleton-loader v-if="waitingResponse" type="table"></v-skeleton-loader>

        <v-card v-else  class="mt-3 pa-5 rounded-t-0 rounded-b-2 not-bordered" outlined>
            <v-data-table
                class="mt-4"
                v-model="selectedItems"
                show-select
                :headers="headers"
                :items="items"
                fixed-header
                height="55vh"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :options.sync="pagination"
                :server-items-length="serverItemsLength"
                :footer-props="{
                    itemsPerPageOptions: itemsPerPageOptions,
                }"
            >

                <template v-slot:[`item.name`]="{ item }">
                    <span class="caption font-weight-normal text-uppercase blue-grey--text text--darken-4">
                        {{item.name}}
                    </span>
                </template>

                <template v-slot:[`item.last_name`]="{ item }">
                    <span class="caption font-weight-normal text-uppercase blue-grey--text text--darken-4">
                        {{item.last_name}}
                    </span>
                </template>

                <template v-slot:[`item.cellphone`]="{ item }">
                    <span class="caption font-weight-normal text-uppercase blue-grey--text text--darken-4">
                        {{item.cellphone}}
                    </span>
                </template>

                <template v-slot:[`item.email`]="{ item }">
                    <span class="caption font-weight-normal text-uppercase blue-grey--text text--darken-4">
                        {{item.email}}
                    </span>
                </template>

                <template v-slot:[`item.role`]="{ item }">
                    <span class="caption font-weight-normal text-uppercase blue-grey--text text--darken-4">
                        {{item.role}}
                    </span>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                    <v-menu offset-y>
                        <template v-slot:activator="{on,attrs}">
                            <v-btn v-bind="attrs" v-on="on" icon>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item-group shaped active-class="white">
                                <v-list-item @click="updateUserDrawer(item)">
                                    <v-list-item-title>
                                        Actualizar
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="showDeleteModal(item)">
                                    <v-list-item-title>Eliminar</v-list-item-title>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
                </template>

            </v-data-table>
        </v-card>

        <DeleteConfirmation 
            @delete="destroy()" 
            :loading="waitingResponse" 
            v-model="deleteModal"
        />
    </div>
</template>


<script>
import Table from "../components/Common/Table.vue";
import UserService from "../services/user";

import HeaderPage from "../components/Contact/base/headerPage.vue";
import SearchField from "../components/Common/Fields/Search.vue";
import DeleteConfirmation from '../components/Common/DeleteConfirmation.vue';

export default {
    extends:Table,
    components:{
        HeaderPage,
        SearchField,
        DeleteConfirmation
    },
    data() {
        return {
            apiService:UserService,
            createdEvent:"add-new-user",
            updatedEvent:"update-user",
            query:{
                pattern:"",
                status:""
            },
            selectedItems:[],
            headers:[
                {
					text: "Nombre",
					align: "left",
					value: "name",
					class: "text-uppercase caption font-weight-light",
				},
                {
					text: "Apellido",
					align: "left",
					value: "last_name",
					class: "text-uppercase caption font-weight-light",
				},
                {
					text: "Celular",
					align: "left",
					value: "cellphone",
					class: "text-uppercase caption font-weight-light",
				},
                {
					text: "Correo",
					align: "left",
					value: "email",
					class: "text-uppercase caption font-weight-light",
				},
                {
					text: "Rol",
					align: "left",
					value: "role",
					class: "text-uppercase caption font-weight-light",
				},
                {
					text: "",
					align: "left",
					value: "actions",
					class: "text-uppercase caption font-weight-light",
				},
            ]
        }
    },
    methods:{
        openAddNewUserDrawer() {
            this.addDrawer(
                "UserCreate",
                {
                    title:"Registrar nuevo usuario"
                },
                40
            );
        },
        updateUserDrawer(item){
            this.addDrawer(
                "UserUpdate",
                {
                    title:"Actualizar usuario",
                    id:item.id
                },
                40
            );
        }
    },
    mounted() {

    }
}
</script>