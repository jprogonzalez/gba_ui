<template>
    <v-snackbar
        v-model="visible"
        :top="$vuetify.breakpoint.mdAndUp"
        :right="$vuetify.breakpoint.mdAndUp"
        :bottom="$vuetify.breakpoint.smAndDown"
        :color="color"
        :dark="false"
        :timeout="timeout"
    >
        <div class="d-flex align-center justify-space-between">
            <span class="subtitle-2">{{message}}</span>
            <v-btn dark text icon @click="visible = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>
    </v-snackbar>
</template>

<script>
export default {
    data:() => ({
        visible:false,
        message:'',
        color:'',
        timeout:10000
    }),
    methods:{
        notify(payload) {
            this.visible = false;
            this.color = payload.type;
            this.message = payload.message;
            if (payload.hasOwnProperty('persisten') && payload.persistent) {
                this.timeout = 0;
            }
            this.$nextTick(() => {
                this.visible = true;
            });
        }
    },
    mounted() {
        VueEvent.listen('snackbar-notify',this.notify);
    },
}
</script>