import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/citizen',
    component: () => import(/* webpackChunkName: "citizen" */ '../views/Citizen.vue'),
    children: [
      {
        name: "Citizen",
        path: "/",
        component: () => import("@/views/citizen/Home")
      },
    ]
  },
  {
    path: "/hamal",
    component: () => import("@/views/hamal/Index"),
    children: [
      {
          name: 'Hamal',
          path: "",
          component: () => import("@/views/hamal/Home")
      },
      {
          name: 'HamalVolunteers',
          path: "volunteers",
          component: () => import("@/views/hamal/Volunteers")
      },
      {
          name: 'HamalMissions',
          path: "missions",
          component: () => import("@/views/hamal/Missions")
      },
    ]
  },
  {
    path: "/volunteer",
    component: () => import("@/views/volunteer/Index"),
    children: [
      {
          name: 'Volunteer',
          path: "",
          component: () => import("@/views/volunteer/Home")
      },
      {
          name: 'Signup',
          path: "/signup",
          component: () => import("@/views/volunteer/Auth/Signup")
      },

    ]
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
