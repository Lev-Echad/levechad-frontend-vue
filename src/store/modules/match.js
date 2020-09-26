import axios from "axios";

const state = {
  mapPoints: [],
  openHelpRequests: [],

  focusedMissionId: "",
  focusedMissionDetails: {},
  bestVolunteers: [],
  isLoading: false,
  HamalHelpRequestFields:{
    status:'',
    helping_volunteer:'',
    notes:'',
    status_updater:'',
    type_text:''
  },
};
const getters = {
  getMapPoints(state) {
    return state.mapPoints;
  },
  getMapPointsFilterByCity(state) {
    return keyword => state.mapPoints.filter(mapPoint =>{
      return mapPoint.city === keyword
    });
  },
  getMapPointsFilterByStatus(state) {
    return keyword => state.mapPoints.filter(mapPoint =>{
      return mapPoint.status === keyword
    });
  },
  openHelpRequests(state) {
    return state.openHelpRequests;
  },

  focusedMissionDetails(state) {
    return state.focusedMissionDetails;
  },
  getFocusedMissionId(state) {
    return state.focusedMissionId;
  },
  bestVolunteers(state) {
    return state.bestVolunteers;
  },
  isLoading(state) {
    return state.isLoading;
  },
  HamalHelpRequestFields(state) {
    return state.HamalHelpRequestFields;
  },
  getHelpRequestById(state) {
    return helprequest_id => state.mapPoints.filter(mapPoint =>{
     // console.log(mapPoint);
      return mapPoint.id == helprequest_id
    });
  },
  getHelpRequestByPhone(state) {
    return helprequest_phone => state.mapPoints.filter(mapPoint =>{
     // console.log(mapPoint);
      return mapPoint.phone_number == helprequest_phone
    });
  },
};

const mutations = {
  setMapPoints(state, payload) {
    state.mapPoints.length = 0; // Clear contents
    state.mapPoints.push.apply(state.mapPoints, payload); // Append new contents
  },
  focusedMissionDetails(state, payload) {
    state.focusedMissionDetails = {
      ...state.focusedMissionDetails,
      ...payload,
    };
  },
  focusedMissionHamalFields(state, payload) {
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
  focusedMissionId(state, payload) {
    state.focusedMissionId = payload;
  },
  bestVolunteers(state, payload) {
    state.bestVolunteers.length = 0; // Clear contents
    state.bestVolunteers.push.apply(state.bestVolunteers, payload); // Append new contents
  },
  isLoading(state, payload) {
    state.isLoading = payload;
  },
  updateMapMarkerStatus(state, payload){
    let mission_id = payload.id;
    let new_status = payload.status;
    state.mapPoints.forEach(point => {
      if (point.id === mission_id) {
        point.status = new_status
      }
    });
  },
};
const actions = {
  // get all help request 
  reqGetOpenHelpRequests(context) {
    axios
      .get(context.rootState.baseAPIurl + "/api/maphelprequests/?status__in=IN_CARE,WAITING,TO_VOLUNTER", {
        headers: {
          Authorization: "Token " + context.rootState.hamalAuth.accessToken,
        },
      })
      .then((response) => {
        context.commit("setMapPoints", response.data);
        //    console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // find best match per mission id
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
          context.commit("focusedMissionId", helprequest_id);
          context.commit("isLoading", false);
          console.log(response);
        })
        .catch((err) => {
          context.commit("isLoading", false);
          console.log(err);
        });
    }
  },
  // called from pressing map marker
  reqFocusedMissionDetails(context, helprequest_id) {
    context.commit("isLoading", true);
    axios
    .get(
        context.rootState.baseAPIurl +
        "/api/helprequests/?id=" +
        helprequest_id,
        {
          headers: {
            Authorization: "Token " + context.rootState.hamalAuth.accessToken,
          },
        }
    )
    .then((response) => {
      context.commit("focusedMissionDetails", response.data.results[0]);
      context.commit("isLoading", false);
      context.commit("focusedMissionId", helprequest_id);
      let payload = response.data.results[0]
      if(!payload.helping_volunteer){
        payload.helping_volunteer = {
          id:null,
          full_name:null
        }
      }
      context.commit('updateMapMarkerStatus', payload) //update map marker (needed after changing something in mission ops)
      context.commit('focusedMissionHamalFields', payload)
      context.dispatch("reqBestMatch", helprequest_id);


      //  this.reqBestMatch()
    })
    .catch((err) => {
      context.commit("isLoading", false);
      console.log(err);
    });

    },

  // update
  updateHelpRequest(context) {
    // let helprequest_id = (payload.helprequest_id!='' ||payload.helprequest_id=="undefined" ) ? context.state.focusedMissionId : payload.helprequest_id
    let helprequest_id = context.state.focusedMissionId;
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
         context.dispatch('reqFocusedMissionDetails', helprequest_id  )

      })
      .catch((err) => {
        context.commit("isLoading", false);
        console.log(err);
      });
  },




}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
