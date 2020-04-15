import Vue from 'vue'
import Vuex from 'vuex'
import hamal from './modules/hamal'
import citizen from './modules/citizen'
import volunteerSignup from './modules/volunteer-signup'
import hamalAuth from './modules/hamal-auth'
import api from './modules/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseAPIurl: "http://localhost:7000"
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    hamal, citizen, volunteerSignup, api,hamalAuth

    
  }
})