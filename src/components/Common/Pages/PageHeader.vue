<template>

    <div class="header_page d-flex justify-space-between align-center">
        <h4 class="text-h5 font-weight-medium text-uppercase blue-grey--text text--darken-4">{{pageTitle}}</h4>
        <div class="">
            <slot/>
        </div>
    </div>

</template>


<script>
export default {
    props:{
        pageTitle:{}
    }
}
</script>