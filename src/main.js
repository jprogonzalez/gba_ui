import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PortalVue from 'portal-vue';
import vuetify from './plugins/vuetify'
import "./scss/general.scss";

window.moment = require("moment");

import VueMask from 'v-mask'
Vue.use(VueMask);

import VueEvent from './utils/VueEvent';
window.VueEvent = new VueEvent();

require("./plugins/veevalidate");

Vue.config.productionTip = false

Vue.use(PortalVue);

Vue.mixin({
	methods: {
		hasPermissions(role) {
			if (role === '*') {
				return true;
			}
			let userProfile = JSON.parse(localStorage.getItem('auth-profile'));

			return userProfile?.role?.key === role;
		},
		textToUppercase(text) {
			return text.toUpperCase();
		},
		addDrawer(component = null, props = null, width = null) {
			var drawer = {
				component: component,
				props: props,
				width: width
			};
			this.$store.commit("addDrawer", drawer);
			return this.$store.getters["drawers"].length - 1;
		},
		closeDrawer() {
			this.$store.commit("closeDrawer");
		},
		removeDrawers() {
			this.$store.commit("drawer/removeDrawers");
		},
		toggleDrawer(index) {
			window.VueEvent.fire("toggle-drawer", { index: index });
		},
		successSnackbar(message) {
			window.VueEvent.fire("snackbar-notify", {
				type: "success",
				message: message
			});
		},
		errorSnackbar(message) {
			window.VueEvent.fire("snackbar-notify", {
				type: "error",
				message: message
			});
		},
		drawerFilters(title,params,size){
			this.addDrawer(
				title,
				params,
				size
			);
		}
	},
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = !!localStorage.getItem("auth-profile");

	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!isAuthenticated) {
			return next({ path: '/login' });
		}

		const requiredPermission = to.meta.permissions;
		const user = JSON.parse(localStorage.getItem("auth-profile"));

		if (requiredPermission && user?.role?.key !== requiredPermission) {
			return next({ path: '/login' });
		}
	}

	next(); // todo bien, sigue navegando
});


new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
