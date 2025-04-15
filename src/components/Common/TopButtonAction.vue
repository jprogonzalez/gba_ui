<template>
    <v-btn-toggle class="filters-button-group" outlined color="grey">
        <v-btn v-if="refresh" @click="$emit('refresh')" color="" class="text-capitalize font-weight-bold" outlined height="40">
            <v-icon class="">mdi-reload</v-icon>
        </v-btn>
        <v-btn v-if="pdf"  @click="$emit('pdf-export')"  class="text-capitalize font-weight-regular" color="blue-grey darken-4" outlined height="40">
            <v-icon>mdi-file-pdf-box</v-icon>
        </v-btn>
        <v-btn v-if="excel"  @click="$emit('excel-export')"  class="text-capitalize font-weight-regular" color="blue-grey darken-4" outlined height="40">
            <v-icon>mdi-microsoft-excel</v-icon>
        </v-btn>
        <v-btn v-if="filter" @click="$emit('filter')"  class="text-capitalize font-weight-regular" color="blue-grey darken-4" outlined height="40">
            <v-icon>mdi-filter</v-icon>
        </v-btn>
        <v-btn v-if="qrCodeLector" @click="$emit('qr')"  class="text-capitalize font-weight-regular" color="blue-grey darken-4" outlined height="40">
            <v-icon>mdi-qrcode-scan</v-icon>
        </v-btn>
    </v-btn-toggle>
</template>

<script>
export default {
    props:{
        refresh:{
            type:Boolean,
            default:true
        },
        qrCodeLector:{
            default:false
        },
        pdf:{
            type:Boolean,
            default:true
        },
        excel:{
            type:Boolean,
            default:true
        },
        filter:{
            type:Boolean,
            default:true
        }
    },
    methods:{
    }
}
</script>