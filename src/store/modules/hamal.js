

const state = {

  drawer: null,
  fousedMission:     {
    "id": 7701,
    "full_name": "אילנה דלל",
    "phone": 508320135,
    "area": "מרכז",
    "city": "תל אביב -יפו",
    "timestamp": "10/04/2020 10:10",
    "reason": "קבוצת סיכון גבוהה",
    "address": "הורקנוס 14 תל אביב",
    "comments": "הסתדרה עם הקניות",
    "type": "קניות",
    "moreinfo": "לתאם עם אילנה",
    "status": "לא טופל",
    "last_modified_by": "לי אזולאי חמל תא",
    "voltunteer": "אלון גלבוע - 7343",
    "full_address": "תל אביב -יפו הורקנוס 14 תל אביב",
    "lat": 32.0939137,
    "lng": 34.781184
  },
  
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
  setFocusedMission(state, payload){
    state.fousedMission = payload
  }
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
