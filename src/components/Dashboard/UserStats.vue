<template>
    <v-card class="elevation-3 pa-7 rounded-lg mb-12 mb-xl-0 mb-lg-0">
        <v-card-text class="pb-1">
            <v-row>
                <v-col cols="12" class="py-0 my-0 d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                        <v-icon >mdi-account-circle</v-icon>
                        <span class="font-weight-medium text-h6 pl-2">
                            Estadisticas de Usuarios
                        </span>
                    </div>
                    <span class="font-weight-medium text-h6 pl-2">
                        Total: {{totalUser}}
                    </span>
                    <v-progress-circular
                        v-if="loading"
                        :width="4"
                        color="#fc8cae"
                        indeterminate
                    ></v-progress-circular>
                </v-col>
                <v-col cols="12" class="pa-1">
                    <v-divider></v-divider>
                </v-col>
                <v-col cols="4" class="pt-0">
                    <div class="text-center" v-if="loading">
                        <v-progress-circular
                            v-if="loading"
                            :width="4"
                            color="#fc8cae"
                            indeterminate
                        ></v-progress-circular>
                    </div>
                    <Doughnut 
                        v-else
                        style="max-height:161px;" 
                        :data="usersChartData" 
                        :options="usersChartDataOptions" 
                    />
                </v-col>
                <v-col cols="8">
                    <v-skeleton-loader type="table-row-divider@3" v-if="loading"> </v-skeleton-loader>
                    <v-data-table
                        v-else
                        dense
                        class="data-table-no-borders"
                        hide-default-footer
                        hide-default-header
                        :items="items"
                        :headers="userStataOverViewChartTableHeader"
                    >

                        <template v-slot:item={item}>
                            <tr>
                                <td>
                                    <span :style="'color:'+userStateOverViewColors[item.role].color" class="font-weight-medium text-capitalize">
                                        {{item.role}}
                                    </span>
                                </td>
                                <td class="text-right"> 
                                    <span :style="'color:'+userStateOverViewColors[item.role].color" class="font-weight-medium">
                                        {{item.count}}
                                    </span>
                                </td>
                            </tr>
                        </template>

                    </v-data-table>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)
export default {
    components: {
        Doughnut
    },
    props:{
        usersStateAPI:{},
        loading:{}
    },
    watch:{
        usersStateAPI(observer) {
            if (observer) {
                this.prepareUsersData();
            }
        }
    },
    computed:{
        totalUser() {
            return this.usersStateAPI.total_users;
        }
    },
    data(){
        return {
            items:[],
            usersChartData :{
                labels: [],
                datasets: [
                    {
                        label:"Total",
                        backgroundColor: ['#366786', '#FF9800'],
                        data: [],
                        hoverOffset:4
                    },
                ],
            },
            usersChartDataOptions:{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            userStataOverViewChartTableHeader:[
                {
                    value:"role",
                    text:"Rol",
                    sortable:false
                },
                {
                    value:"count",
                    text:"Total",
                    sortable:false,
                    align:'center'
                }
            ],
            userStateOverViewColors:{
				administrador:{
					color:"#366786"
				},
				colaborador:{
					color:"#FF9800"
				},
			}
        }
    },
    methods:{
        prepareUsersData() {
            this.items = this.usersStateAPI.users_by_role.map(item => {
                return {
                    role:item.role,
                    count:item.count
                };
            });

            this.usersChartData.labels = this.items.map((item) => {
                return item.role;
            });

            this.usersChartData.datasets[0].data = this.items.map((item) => {
                return item.count;
            });
        }
    },
    mounted() {
    }
}
</script>