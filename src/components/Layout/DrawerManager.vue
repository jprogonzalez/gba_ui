<template>
  <div>
    <v-overlay @click.native="overlayClicked" z-index="300" v-model="showOverlay"></v-overlay>

    <v-navigation-drawer
      v-for="(drawer, index) in drawers"
      :key="index"
      :class="enabledDrawer(index)"
      hide-overlay
      light
      app
      temporary
      stateless
      v-model="visibilities[index]"
      :right="true"
      :width="`${drawer.pixels}px`"
    >
      <template slot="prepend">
        <portal-target :name="`drawer${index}`" />
      </template>
      <component
        style="overflow: auto"
        v-if="drawer.component"
        :is="drawer.component"
        :drawer-index="index"
        :portal-key="`drawer${index}`"
        v-bind="drawer.props"
      />
      <template v-if="!drawer.component">
        <v-btn color="red" dark @click.stop="closeDrawer(drawer)"
          >Close Drawer</v-btn
        >
        <v-btn color="success" dark @click.stop="addDrawer()">Add drawer</v-btn>
        <v-btn color="success" dark @click.stop="addDrawer(null, null, 70)"
          >Add drawer 70</v-btn
        >
        <v-btn
          color="success"
          dark
          @click.stop="addDrawer('LeadsIndex', null, 90)"
          >Add leads</v-btn
        >
        <v-text-field />
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>

import Vue from "vue";

const files = require.context("../", true, /.vue$/i, "sync");

files.keys().map((file) => {
  var subName = file.replace(/(^.\/)/g, "").split(".")[0];
  if ((subName.match(/\//g) || []).length === 1) {
    var name = subName.replace(/\//g, "");
    Vue.component(name, files(file).default);
  }
});

export default {
  data: () => ({
    properties: [],
    visibilities: [],
    dialerWidth: 300, //pixels
    drawersSeparation: 10, //percentage
    windowWidth: 0,
  }),
  methods: {
    enabledDrawer(index){
        // 'enabled-drawer grey lighten-3'
        // 'disabled-drawer grey lighten-3',
        if(index + 2 == this.drawers.length && !this.visibilities[index+1]){
            return 'enabled-drawer grey lighten-3';
        }
        if(index + 1 == this.drawers.length && this.visibilities[index]){
            return 'enabled-drawer grey lighten-3';
        }
        return 'disabled-drawer grey lighten-3';
    },
    overlayClicked(){
      this.validateCloseDrawer();
    },
    toggleDrawer(payload) {
      this.drawers.map((item, index) => {
        var visible = true;
        if (index == payload.index) {
          this.$set(this.visibilities, payload.index, !this.visibilities[payload.index]);
        }
        return visible;
      });
    },
    checkPressedKey(e) {
      if (e.which == 27) {
        this.validateCloseDrawer();
      }
    },
    validateCloseDrawer(){
        let lastIndex = this.drawers.length-1;
        if(this.drawers[lastIndex].props.isSearch && this.visibilities[lastIndex]){
            this.toggleDrawer({index: lastIndex});
            return;
        }
        this.closeDrawer();
    },
    screenResized() {
      this.windowWidth = window.innerWidth;
    },
    lastDrawer(drawers) {
      if (drawers.length > 0) {
        return drawers[drawers.length - 1];
      }

      return null;
    },
    baseWidth(drawer) {
      var defaultSizes = {
        xs: 95,
        sm: 90,
        md: 80,
        lg: 60,
        xl: 50,
      };

      var drawerWidth = null;

      if (
        typeof drawer.width === "object" &&
        drawer.width !== null &&
        drawer.width !== undefined
      ) {
        drawerWidth = drawer.width;
      } else {
        drawerWidth = {
          md: drawer.width,
          lg: drawer.width,
          xl: drawer.width,
        };
      }

      var drawerSizes = {
        xs: drawerWidth.xs ? drawerWidth.xs : defaultSizes.xs,
        sm: drawerWidth.sm ? drawerWidth.sm : defaultSizes.sm,
        md: drawerWidth.md ? drawerWidth.md : defaultSizes.md,
        lg: drawerWidth.lg ? drawerWidth.lg : defaultSizes.lg,
        xl: drawerWidth.xl ? drawerWidth.xl : defaultSizes.xl,
      };

      return drawerSizes[this.$vuetify.breakpoint.name];
    },
  },
  watch: {
    drawers(drawers) {
      setTimeout(() => {
        this.visibilities = drawers.map((item, index) => {
          if (this.visibilities[index] !== undefined) {
            return this.visibilities[index];
          }
          return true;
        });
      }, 1);
    },
  },
  computed: {
    showOverlay() {
        let drawerVisible = false;
      this.visibilities.forEach((item) => {
        if (item) {
          drawerVisible = true;
        }
      });
      return drawerVisible;
    },
    drawers() {
      var freeWidth = this.windowWidth;

      var drawers = this.$store.getters["drawers"]
        ? this.$store.getters["drawers"]
        : [];

      var totalDrawers = drawers.length;

      drawers = drawers.map((drawer, index) => {
        var baseWidth = this.baseWidth(drawer);
        drawer.pixels = (baseWidth / 100) * freeWidth;
        return drawer;
      });

      drawers = drawers.reverse();

      drawers = drawers.map((drawer, index) => {
        if (index > 0) {
          var widthBefore = drawers[index - 1].pixels;
          if (drawer.pixels <= widthBefore) {
            drawer.pixels = widthBefore + 50;
          }
        }

        return drawer;
      });

      return drawers.reverse();
    },
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    VueEvent.listen("toggle-drawer", this.toggleDrawer);
    window.addEventListener("resize", this.screenResized);
    // document.addEventListener("keyup", this.checkPressedKey);
  },
};
</script>