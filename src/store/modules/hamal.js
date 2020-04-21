

const state = {

  drawer: null,
  
};
const getters = {
  
};

const mutations = {
  toggleDrawer(state, payload){
    state.drawer = !state.drawer
  },
  SET_DRAWER (state, payload) {
    state.drawer = payload
  },

};
const actions = {
  toggleDrawer({ commit }){
    commit('toggleDrawer')
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
