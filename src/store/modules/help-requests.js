import axios from "axios";
const state = {
  helpRequests: [],
  totalHelpRequests: 0,
  isLoading: false,
  options: {
    page: 1,

  },
  filters:{
    status:[],
    page: 1,
    pageSize: 4,
    id: '',
    areas:[],
    phone_number:''
  },
  areas:''
};
const getters = {
  helpRequests(state) {
    return state.helpRequests;
  },
  totalHelpRequests(state){
    return state.totalHelpRequests
  },
  isLoading(state){
    return state.isLoading
  },
  filters(state){
    return state.filters
  },
  areas(state){
    return state.areas
  },
  phone_number(state){
    return state.phone_number
  },
};

const mutations = {
  helpRequests(state, payload) {
    state.helpRequests.length = 0; // Clear contents
    state.helpRequests.push.apply(state.helpRequests, payload); // Append new contents
  },
  totalHelpRequests(state, payload){
    state.totalHelpRequests = payload
  },
  isLoading(state, payload){
    state.isLoading = payload
  },
  areas(state, payload){
    state.areas = payload
  },

};
const actions = {
  reqAreas(context) {
    context.commit("isLoading", true)
    axios
      .get(context.rootState.baseAPIurl + "/api/areas/"
      , {
        headers: {
          Authorization: "Token " + context.rootState.hamalAuth.accessToken,
        },
      })
      .then((response) => {
        console.log(response);
       context.commit("areas", response.data)
       context.commit("isLoading", false)
      })
      .catch((err) => {
        context.commit("isLoading", false)
        console.log(err);
      });
  },
  reqHelpRequests(context) {
    context.commit("isLoading", true)
    var {status, page, pageSize, id, areas,phone_number} = context.state.filters
    if(typeof(status) == 'undefined' || status == null) {
      status =''
    }
    if(typeof(id) == 'undefined' || id == null) {
      id =''
    } 
    if(typeof(phone_number) == 'undefined' || phone_number == null) {
      phone_number =''
    } 
    if(typeof(phone_number) == 'undefined' || phone_number == null) {
      phone_number =''
    } 

    axios
      .get(context.rootState.baseAPIurl + "/api/helprequests/?"
      +"status__in="+status
      +"&id="+id
      +"&page="+page
      +"&pageSize="+pageSize
      +"&phone_number="+phone_number
      +"&city__region__in="+areas
      
      , {
        headers: {
          Authorization: "Token " + context.rootState.hamalAuth.accessToken,
        },
      })
      .then((response) => {
       context.commit("helpRequests", response.data.results)
       context.commit("totalHelpRequests", response.data.count)
       context.commit("isLoading", false)
        console.log(response);
      })
      .catch((err) => {
        context.commit("isLoading", false)
        console.log(err);
      });
  },
  async updatehelprequest({ commit, rootState, state },helpRequests) {
    try {
      console.log(helpRequests);
        const data = {
            "status":helpRequests.status,
            "id": helpRequests.id,
            "city": helpRequests.city.name,
            "notes": helpRequests.notes,
        };
        const response = await axios.patch(`${rootState.baseAPIurl}/api/updatehelprequest/${helpRequests.id}/`, data,
            {
                headers: {
                    Authorization: "Token " + rootState.hamalAuth.accessToken,
                }
            }
        )
        //commit('setMessage', 'המשימה עודכנה בהצלחה');
       // commit('setIsSnackbarVisible', true);
        //commit('setDialogIsVisible', false);
    } catch (err) {
        console.log(err);
        //commit('setMessage', 'שגיאה');
        //commit('setIsSnackbarVisible', true);
        //commit('setDialogIsVisible', false);
    }
},
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
