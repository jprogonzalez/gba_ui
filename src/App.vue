<template>
    <v-overlay color="#000000" dark v-if="loading" :value="loading">
      <v-progress-circular size="120" color="red" indeterminate></v-progress-circular>
    </v-overlay>
    <v-app v-else>
        <router-view />
    </v-app>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    window.addEventListener("beforeunload", this.showLoaderBeforeReload);
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.showLoaderBeforeReload);
  },
  data() {
    return {
      loading:false
    }
  },
 methods: {
    showLoaderBeforeReload() {
      // Muestra el loader antes de recargar la página
      this.loading = true; // Asegúrate de que el componente Loader tenga una referencia (`ref="loader"`)
    },
  },
};
</script>
