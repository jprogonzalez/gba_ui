import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Dashboard from '@/pages/dashboard';
import EmployeePage from '@/pages/Employee';

const routes = [
	{
		path: '/login',
		name: 'login',
		component: () => import('../pages/Login')
	},
	{
		path: '*',
		component: () => import("../pages/Error"),
	},
	{
		path: "/",
		component: () => import("../layouts/Layout"),
		props: true,
		children:[
			{
				path: "/",
				name: "dashboard",
				component: Dashboard,
				meta: { 
					requiresAuth: true,
					permissions:'admin'
				},
			},
			{
				path: "/colaboradores",
				name: "employees",
				component: EmployeePage,
				meta: { requiresAuth: true },
			}
		]
	}
];


const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
