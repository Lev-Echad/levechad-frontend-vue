import axios from "axios";
import moment from "moment";
const state = {
  openHelpRequests: [],
  isLoading: true,
  focusedMissionId: '',
  currentHelpRequest:'',
  currentVolunteer:'',
  HamalHelpRequestFields:{
    status:'',
    helping_volunteer:'',
    notes:'',
    status_updater:'',
    type_text:''
  },
  bestVolunteers:[],
  dialog: false,
  stats:{
    'waiting': 0,
    'in_care': 0,
    'to_volunteer': 0,
  }
};
const getters = {
  getOpenHelpRequests(state){
    return state.openHelpRequests
  },

  dialog(state){
    return state.dialog
  },
  isLoading(state){
    return state.isLoading
  },
  bestVolunteers(state) {
    return state.bestVolunteers;
  },
  currentHelpRequest(state) {
    return state.currentHelpRequest;
  },
  HamalHelpRequestFields(state) {
    return state.HamalHelpRequestFields;
  },
  currentVolunteer(state){
    return state.currentVolunteer
  },
  stats(state){
    return state.stats
  }
};

const mutations = {
  setOpenHelpRequests(state, payload) {
    state.openHelpRequests.length = 0; // Clear contents
    state.openHelpRequests.push.apply(state.openHelpRequests, payload); // Append new contents
  },
  setOpenHelpRequestsNextPage(state, payload) {
    state.openHelpRequests.push.apply(state.openHelpRequests, payload); // Append new contents
  },

  isLoading(state, payload) {
    state.isLoading = payload;
  },


  currentHelpRequest(state, payload) {
    switch(payload.status){
      case "WAITING":
        payload.status = "התקבלה"
        break;
      case "IN_CARE":
        payload.status = "בטיפול"
        break;
      case "TO_VOLUNTER":
        payload.status = "הועבר למתנדב"
        break;
      case "DONE":
        payload.status = "סיום טיפול"
        break;
      case "NOT_DONE":
        payload.status = "לא רלוונטי"
        break;
    }
    state.currentHelpRequest = {
      ...state.currentHelpRequest,
      ...payload,
    };
    state.dialog= true
   // state.currentHelpRequest = payload;
    this.commit("market/currentHelpRequestHamalFields", state.currentHelpRequest)
  },
  currentHelpRequestHamalFields(state, foo){
    let payload = {...foo}
    if(!payload.helping_volunteer){
      payload.helping_volunteer = {
        id:null,
        full_name:null,
        phone_number:null,
      }
    }
    switch(payload.status){
      case "התקבלה":
        payload.status = "WAITING"
        break;
      case "בטיפול":
        payload.status = "IN_CARE"
        break;
      case "הועבר למתנדב":
        payload.status = "TO_VOLUNTER"
        break;
      case "סיום טיפול":
        payload.status = "DONE"
        break;
      case "לא רלוונטי":
        payload.status = "NOT_DONE"
        break;
    }

    state.HamalHelpRequestFields = {
      status: payload.status,
      helping_volunteer: payload.helping_volunteer.id,
      notes: payload.notes,
      status_updater:payload.status_updater,
      type_text:payload.type_text

    }
  },
  toggleDialog(state){
    state.dialog = !state.dialog
  },
  bestVolunteers(state, payload) {
    state.bestVolunteers.length = 0; // Clear contents
    state.bestVolunteers.push.apply(state.bestVolunteers, payload); // Append new contents
  },

  currentVolunteer(state, payload){
    state.currentVolunteer = payload
  },

  calculateStats(state){
    let WAITING = 0
    let IN_CARE = 0
    let TO_VOLUNTEER = 0
    let open_missions = state.openHelpRequests
    for (let i in open_missions){
      let status = open_missions[i].status
      switch (status) {
        case "התקבלה":
          WAITING++;
          break;
        case "הועבר למתנדב":
          TO_VOLUNTEER++;
          break;
        case "בטיפול":
          IN_CARE++;
          break;
      }
    }
    state.stats.waiting = WAITING
    state.stats.in_care = IN_CARE
    state.stats.to_volunteer = TO_VOLUNTEER
  },


};
const actions = {
  // get all help request
  reqOpenHelpRequests(context) {
    context.commit("isLoading", true);
    axios
    .get(context.rootState.baseAPIurl + "/api/helprequests/?status__in=IN_CARE,WAITING,TO_VOLUNTER&pageSize=100", {
      headers: {
        Authorization: "Token " + context.rootState.hamalAuth.accessToken,
      },
    })
    .then((response) => {
      context.commit("setOpenHelpRequests", response.data.results);

      if(response.data.next){
        context.dispatch("reqOpenHelpRequestsNextPage", response.data.next)
      }
      else{
        context.commit("calculateStats")
        context.commit("isLoading", false);
      }

    })
    .catch((err) => {
      console.log(err);
      context.commit("isLoading", false);
    });
  },
  reqOpenHelpRequestsNextPage(context, page_link){
    context.commit("isLoading", true);
    axios
    .get(page_link, {
      headers: {
        Authorization: "Token " + context.rootState.hamalAuth.accessToken,
      },
    })
    .then((response) => {
      context.commit("setOpenHelpRequestsNextPage", response.data.results);
      if(response.data.next){
        context.dispatch("reqOpenHelpRequestsNextPage", response.data.next)
      }
      else{
        context.commit("calculateStats")
        context.commit("isLoading", false);
      }

    })
    .catch((err) => {
      console.log(err);
      context.commit("isLoading", false);
    });
  },



  reqBestMatch(context, helprequest_id) {
    if (helprequest_id) {
      context.commit("isLoading", true);
      axios
      .get(
          context.rootState.baseAPIurl +
          "/api/volunteers/best_match/?helprequest_id=" +
          helprequest_id,
          {
            headers: {
              Authorization: "Token " + context.rootState.hamalAuth.accessToken,
            },
          }
      )
      .then((response) => {
        context.commit("bestVolunteers", response.data);
        context.commit("isLoading", false);
        console.log(response);
      })
      .catch((err) => {
        context.commit("isLoading", false);
        console.log(err);
      });
    }
  },


  updateHelpRequest(context) {
    // let helprequest_id = (payload.helprequest_id!='' ||payload.helprequest_id=="undefined" ) ? context.state.focusedMissionId : payload.helprequest_id
    let helprequest_id = context.state.currentHelpRequest.id;
    //let vol_id = payload.volunteer_id;
    //console.log("vol_id: " + vol_id);
    context.commit("isLoading", true);
    axios
    .patch(
        context.rootState.baseAPIurl +
        "/api/updatehelprequest/" +
        helprequest_id +
        "/",
        {
          ...context.state.HamalHelpRequestFields
        },
        {
          headers: {
            "Authorization": "Token " + context.rootState.hamalAuth.accessToken,
            "Content-Type": "application/json",
          },
        }
    )
    .then((response) => {
      context.commit("isLoading", false);
      console.log(response.data)
     // context.commit("currentHelpRequest", response.data)
       context.dispatch('updateCurrentHelpRequest', helprequest_id  )

    })
    .catch((err) => {
      context.commit("isLoading", false);
      console.log(err);
    });
  },

  updateCurrentHelpRequest(context, helpRequestId) {
    let helprequest_id = helpRequestId
    context.commit("isLoading", true);
    axios
    .get(context.rootState.baseAPIurl + "/api/helprequests/?id="+helprequest_id, {
      headers: {
        Authorization: "Token " + context.rootState.hamalAuth.accessToken,
      },
    })
    .then((response) => {
      context.commit("currentHelpRequest", response.data.results[0]);
      context.commit("isLoading", false)

      //@TODO: change the state with the response data and not call the server
      context.dispatch('reqOpenHelpRequests' )
    })
    .catch((err) => {
      console.log(err);
      context.commit("isLoading", false);
    });
  },

  getHelpRequestGeo(context, helpRequestId){
    let helprequest_id = helpRequestId
    context.commit("isLoading", true);
    axios
    .get(context.rootState.baseAPIurl + "/api/maphelprequests/?id="+helprequest_id, {
      headers: {
        Authorization: "Token " + context.rootState.hamalAuth.accessToken,
      },
    })
    .then((response) => {
      console.log(response)
      let geo = {
        location_latitude: response.data[0].location_latitude,
        location_longitude: response.data[0].location_longitude,
      }
      context.commit("currentHelpRequest", geo);
      context.commit("isLoading", false);
    })
    .catch((err) => {
      console.log(err);
      context.commit("isLoading", false);
    });
  },

  async volunteerFreeze({commit, rootState, state}, payload) {
    try {
      let volunteer = payload.volunteer
      let days_to_freeze = payload.days_to_freeze

      let date = moment().add(days_to_freeze, 'days').format('YYYY-MM-DD')
      const data = {
        "volunteer": volunteer.id,
        "expiration_date": date
      };
      const response = await axios.post(`${rootState.baseAPIurl}/api/SetVolunteerFreeze/`, data,
          {
            headers: {
              Authorization: "Token " + rootState.hamalAuth.accessToken,
            }
          }
      )
      commit("currentVolunteer", '')

    } catch (err) {
      console.log(err)
    }
  },
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
