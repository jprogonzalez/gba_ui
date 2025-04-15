<template>
    <v-container class="h-100">

        <SkeletonLoader v-if="waitingResponse" />

        <v-card v-else class="pa-5 not-bordered h-100" elevation="0">
            
            <v-card-title class="pl-0 text-uppercase d-flex aling-center justify-space-between">

                <div>
                    <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    
                    <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                    <span >
                        
                    </span>

                    <span class="text-h4 font-weight-medium text-uppercase blue-grey--text text--darken-4">
                        Calendarización de tareas 
                        <span v-if="$refs.calendar">({{ $refs.calendar.title }}) </span>
                    </span>
                </div>
            </v-card-title>

            <v-calendar
                v-model="focus"
                ref="calendar"
                @click:event="showEvent"
                :events="events"
                color="orange darken-2 white--text"
                class="white--text"
                :type="calendarType"
                event-color="primary"
                style="height:90%;"
            ></v-calendar>

            <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
            >
                <v-card @click="openUpdateLogDrawer(selectedEvent)" class="pa-0 cursor-pointer" min-width="450px">
                    <v-card-title class="subtitle-2 d-flex justify-space-between align-items">
                        {{selectedEvent.name}}

                        <StatusLog 
                            :status="selectedEvent.status" 
                        />
                    </v-card-title>
                    <v-card-text>
                        {{selectedEvent.observations}} <br>
                        {{selectedEvent.description}}
                    </v-card-text>
                    <v-card-text class="pt-0" v-if="selectedEvent.agent">
                        <span>Persona asignada: {{selectedEvent.agent.full_name}}</span>
                    </v-card-text>
                    <v-card-text class="pt-0" v-if="selectedEvent.agent">
                        <span class="caption">Fecha de tarea: {{selectedEvent.due_date}}</span>
                    </v-card-text>
                </v-card>
            </v-menu>
        </v-card>

    </v-container>
</template>

<script>
import Table from "../components/Common/Table.vue";
import LogService from  "../services/Log";

import SkeletonLoader from "../components/Common/skeletonLoader.vue";
import LogCard from '../components/Contact/components/logs/Card.vue';
import StatusLog from "../components/Log/components/Status.vue";
import CalendarType from '../components/Common/Fields/CalendarType.vue';

import { formatDate } from '../utils/helpers';

export default {
    extends:Table,
    mixins:[formatDate],
    components:{
        LogCard,
        SkeletonLoader,
        StatusLog,
        CalendarType
    },
    computed:{
        tasks() {
            return this.items.filter(item => item.type === 'task');
        },
        events(){
            return this.tasks.map(item => {

                const dueDate = this.formatDate(item.due_date,false,false,"YYYY-MM-DD");

                const min = new Date(`${dueDate}T00:00:00`);
                const max = new Date(`${dueDate}T23:59:59`);
                
                const allDay = this.rnd(0, 3) === 0
                const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                const secondTimestamp = this.rnd(2, 0) * 900000


                const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                const second = new Date(first.getTime() + secondTimestamp)

                const student = item.contact;

                return  {
                    id:item.id,
                    name:item.title+" ["+student.student_name+" "+student.student_last_name+"]",
                    start:first,
                    end:second,
                    status:item.status,
                    agent:item.agent,
                    contact:item.contact,
                    description:item.description,
                    observations:item.observations,
                    due_date:dueDate
                };


            });
        }
    },
    data(){
        return  {
            apiService:LogService,
            focus: '',
            selectedOpen:false,
            selectedEvent:{},
            selectedElement:null,
            calendarType:"month"
        }
    },
    methods:{
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
        showEvent({ nativeEvent, event }){
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        openUpdateLogDrawer(event) {
            this.addDrawer(
                "LogUpdate",
                {
                    title:"Actualizar nota/tarea de la bitacora",
                    id:event.id
                },
                50
            );
        },
    },
    mounted(){
        this.$refs.calendar.checkChange()
    }
}
</script>