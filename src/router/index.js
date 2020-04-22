import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthGuard from "./auth-guard";

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
    component: () => import(/* webpackChunkName: "citizen" */ '../views/citizen/Index.vue'),
    children: [
      {
        name: "Citizen",
        path: "",
        component: () => import("@/views/citizen/RequestHelp")
      },
      // {
      //   name: "RequestHelp",
      //   path: "RequestHelp",
      //   component: () => import("@/views/citizen/RequestHelp")
      // },
      {
        name: "FinishRequestForm",
        path: "request-sent",
        component: () => import("@/views/citizen/FinishRequest")
      },
    ]
  },
  {
      name: 'Login',
      path: "/login",
      component: () => import("@/views/hamal/Login")
  
  },
  {
    path: "/hamal",
    component: () => import("@/views/hamal/Index"),
    beforeEnter: AuthGuard,
    meta: {
   //   requiresLogged: true
    },
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
          name: 'HamalMatch',
          path: "match",
          component: () => import("@/views/hamal/Match")
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
          path: "signup",
          component: () => import("@/views/volunteer/Auth/Signup")
      },
      {
          name: 'VolunteerLogin',
          path: "login",
          component: () => import("@/views/volunteer/Auth/Login")
      },
      {
          name: 'VolunteerThankYou',
          path: "VolunteerThankYou",
          component: () => import("@/views/volunteer/Auth/VolunteerThankYou")
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
