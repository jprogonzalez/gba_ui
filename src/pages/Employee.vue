<template>
    <div>
        <v-skeleton-loader v-if="waitingResponse" type="table" class="mt-3"></v-skeleton-loader>

        <v-card v-else class="elevation-3 pa-7 rounded-lg mb-12 mb-xl-0 mb-lg-0">

            <v-row class="d-flex justify-space-between align-center">
                <v-col cols="12" xl="4" lg="4" md="4">
                    <SearchField  debounced label="Buscar por nombre o correo electronico" v-model="query.pattern" />
                </v-col>
                <v-col cols="12"  xl="8" lg="8" md="8" class="text-start text-xl-end text-lg-end text-md-end">
                    <v-row>
                        <v-col cols="12" class="mb-0 pb-0">
                            <TopButtonAction
                                :pdf="false"
                                :filter="true"
                                :excel="false"
                                @refresh="getItems()"
                                @filter="filterEmployeeDrawer"
                            />
                        </v-col>
                        <v-col cols="12" v-if="filtering">
                            <v-chip small @click="removeFilters">
                                Quitar filtros
                                <v-icon>mdi-close</v-icon>
                            </v-chip>
                        </v-col>
                    </v-row>
                    
                </v-col>
            </v-row>

            <v-data-table
                class="mt-4 clickable-rows"
                v-model="selectedItems"
                show-select
                :headers="headers"
                :items="items"
                fixed-header
                height="63vh"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :options.sync="pagination"
                :server-items-length="serverItemsLength"
                :footer-props="{
                    itemsPerPageOptions: itemsPerPageOptions,
                }"
                mobile-breakpoint="0" 
            >

                <template v-slot:[`item.name`]="{ item }">
                    <span class="caption font-weight-light text-capitalize">
                        {{item.name+" "+item.last_name}}
                    </span>
                </template>

                <template v-slot:[`item.email`]="{ item }">
                    <span class="caption font-weight-light">
                        {{item.email}}
                    </span>
                </template>

                <template v-slot:[`item.status`]="{ item }">
                    <v-switch
                        v-if="hasPermissions('admin')"
                        v-model="item.status"
                        @change="updateStatus(item)"
                        :loading="loadingStatus"
                        :label="item.status ? 'Activo' : 'Inactivo'"
                    ></v-switch>

                    <span v-else>
                        {{item.status ? 'Activo' : 'Inactivo'}}
                    </span>
                </template>

                <template v-slot:[`item.role`]="{ item }">
                    <v-chip :class="item?.role?.key == 'admin' ? 'primary--bg' : 'orange'" dark label small class="mr-2 lighten-2 text-capitalize">
                        {{item.role?.name}}
                    </v-chip>
                </template>

                

                <template v-slot:[`item.createdAt`]="{ item }">
                    <span class="caption font-weight-light text-capitalize">
                        {{formatDate(item.createdAt)}}
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
                                <v-list-item v-if="hasPermissions('admin')" @click="updateEmployeeDrawer(item)">
                                    <v-list-item-title>
                                        Actualizar
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="hasPermissions('*')" @click="openDetailProductDrawer(item)">
                                    <v-list-item-title>
                                        Detalle
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="hasPermissions('admin')" @click="showDeleteModal(item)">
                                    <v-list-item-title>Eliminar</v-list-item-title>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
                </template>

            </v-data-table>
            <ButtonFabFloating v-if="hasPermissions('admin')" @add="openEmployeeCreate" />
        </v-card>

        <DeleteConfirmation 
            @delete="destroy()" 
            :loading="waitingResponse" 
            v-model="deleteModal"
        />
    </div>
</template>

<script>
import Table from '../components/Common/Table.vue';
import UserService from "../services/user";

import { formatDate } from "../utils/helpers";

import SearchField from "../components/Common/Fields/Search.vue";
import DeleteConfirmation from '../components/Common/DeleteConfirmation.vue';
import TopButtonAction from '../components/Common/TopButtonAction.vue';
import ButtonFabFloating from "../components/Common/ButtonFabFloating.vue";


export default {
    extends:Table,
    mixins:[formatDate],
    components:{
        SearchField,
        DeleteConfirmation,
        TopButtonAction,
        ButtonFabFloating
    },
    data() {
        return {
            apiService:UserService,
            createdEvent:"user-create",
            updatedEvent:"user-update",
            query:{
                pattern:"",
                role:null
            },
            selectedItems:[],
            loadingStatus:false,
            headers:[
                {
					text: "Nombre",
					align: "left",
					value: "name",
					class: "text-uppercase caption font-weight-light",
				},
                {
					text: "Correo electronico",
					align: "left",
					value: "email",
					class: "text-uppercase caption font-weight-light",
				},
                {
					text: "Fecha de registro",
					align: "left",
					value: "createdAt",
					class: "text-uppercase caption font-weight-light",
				},
                {
					text: "Rol",
					align: "left",
					value: "role",
					class: "text-uppercase caption font-weight-light",
				},
                {
					text: "Estatus",
					align: "left",
					value: "status",
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
        openEmployeeCreate() {
            this.addDrawer(
                "UserCreate",
                {
                    title:"Agregar nuevo colaborador"
                },
                55
            );
        },
        openDetailProductDrawer(item) {
            this.addDrawer(
                "UserShow",
                {
                    title:"Detalle del colaborador",
                    id:item.id
                },
                55
            );
        },
        updateEmployeeDrawer(item) {
            this.addDrawer(
                "UserUpdate",
                {
                    title:"actualizar colaborador",
                    id:item.id
                },
                60
            );
        },
        async updateStatus(item){
            this.loadingStatus = true;
            try {
                const response = await this.apiService.updateStatus(item.id);

                this.successCallback(response.data);  
            }catch(error) {
                this.processError(error);
            }
            this.loadingStatus = false;
        },
        filterEmployeeDrawer() {

            let currentFilterParams = {
                role:this.query.role
            };

            this.addDrawer(
                "UserFilter",
                {
                    title:"filtar colaborador",
                    currentFilters:currentFilterParams
                },
                60
            );
            
        },
        removeFilters() {
            this.query = {
                pattern:"",
                role:null
            };
            this.filtering = false;
        },
        
    },
    mounted() {
        VueEvent.listen("employee-filter",this.applyFilters);
    }

}
</script>