<template>
    <div>
        <template v-if="pageStop == 0">
            no results
        </template>
        <template v-if="pageStop > 0">
            {{pageStart}}-{{correctPageStop}} of {{serverItemsLength}}
        </template>
    </div>
</template>

<script>
export default {
    props:{
        pageStop:{},
        pageStart:{},
        serverItemsLength:{}
    },
    computed:{
        correctPageStop() {
            return this.serverItemsLength < this.pageStop ? this.serverItemsLength : this.pageStop;
        }
    }
}
</script>