import Vue from 'vue'
import Vuex from 'vuex'
import hamal from './modules/hamal'
import citizen from './modules/citizen'
import volunteerSignup from './modules/volunteer-signup'
import api from './modules/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    hamal, citizen, volunteerSignup, api

    
  }
})