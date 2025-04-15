<template>
    <v-layout wrap>
        <v-flex xs12>
            <v-card>
                <v-list class="pa-0">
                    <v-list-group >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <div class="d-flex align-center ">
                                    <img class="mr-2" style="max-width:20px !important; heigth:20px !important; border-radius:50%;" :src="logo" alt="">
                                    <span class="font-weight-bold caption text-uppercase">Yeshua admin</span>
                                </div>
                            </v-list-item-content>
                        </template>
                    </v-list-group>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            logo:"https://res.cloudinary.com/sendasur-com/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1669342951/rdr/308813115_187265633869076_2306163185690190234_n_asnj3k.png"
        }
    }
}
</script>