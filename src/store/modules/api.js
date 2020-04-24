import axios from "axios";
import router from "../../router/index";

const state = {
  missionFilters: {
 //   exact: null,
  },
  volunteerFilter:{
    id: '',
    tz_number: '',
    first_name: '',
    last_name: '',
    city: '',
    phone_number: '',
  },
  volunteerPage:{
    next: false,
    current: 1,
    count: '',
    previous: false
  },

  citiesList: [],

  //used to push data from sepetate components
  VolunteerSignUpFields: {
    first_name: "",
    last_name: "",
    tz_number: "",
    date_of_birth: null,
    gender: null,
    city: null,
    address: "",
    moving_way: null,
    week_assignments_capacity: null,
    wanted_assignments: null,
    phone_number: "",
    email: "",
    parental_consent: {
      parent_name: "XXX",
      parent_id: "123123123",
    },
    languages: [],
  },

  helpRequestFields: {
    full_name: "",
    phone_number: "",
    city: null,
    address: "",
    notes: "",
    type: null,
    type_text: "",
    request_reason: null,
  },
  helpRequestCityValid: false,
  volunteersSignUpCityValid: false,
  volunteersSignUpBdateValid: false,

  isLoading: false,
  createVolunteerFailed: false,


};
const getters = {
  getVolunteersList(state) {
    return state.volunteersList;
  },
  getMissions(state) {
    return state.missionList;
  },

  getCitiesList(state) {
    return state.citiesList;
  },

  getHelpRequestFormFields(state) {
    return state.helpRequestFields;
  },

  getHelpRequestCityValid(state) {
    return state.helpRequestCityValid;
  },
  getVolunteersSignUpCityValid(state) {
    return state.volunteersSignUpCityValid;
  },
  getVolunteersSignUpBdateValid(state) {
    return state.volunteersSignUpBdateValid;
  },
  getCreateVolunteerFailed(state) {
    return state.createVolunteerFailed;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getVolunteerFilter(state){
    return state.volunteerFilter
  },
  getVolunteerPage(state){
    return state.volunteerPage
  },

};

const mutations = {
  // setVoltuneersList({ state }, payload) {
  //   console.log("blabla");
  // },
  setMissionsList({ state }, payload) {
    missionList.push([...payload]);
  },

  setCitiesList(state, payload) {
    state.citiesList = payload;
  },
  setVolunteerSignUpField(state, payload) {
    state.VolunteerSignUpFields = {
      ...state.VolunteerSignUpFields,
      ...payload,
    };
  },
  setHelpRequestFormField(state, payload) {
    state.helpRequestFields = { ...state.helpRequestFields, ...payload };
  },
  setHelpRequestCityValid(state, payload) {
    state.helpRequestCityValid = payload;
  },
  setVolunteersSignUpCityValid(state, payload) {
    state.volunteersSignUpCityValid = payload;
  },
  setVolunteersSignUpBdateValid(state, payload) {
    state.volunteersSignUpBdateValid = payload;
  },
  setCreateVolunteerFailed(state, payload) {
    state.createVolunteerFailed = payload;
  },
  setIsLoading(state, payload) {
    state.isLoading = payload;
  },

  setVolunteersList(state, payload) {
    //state.voltunteerList = payload;
    state.volunteersList.length = 0; // Clear contents
    state.volunteersList.push.apply(state.volunteersList, payload); // Append new contents
  },
  setVolunteerFilter(state, payload){
    state.volunteerFilter = {...state.volunteerFilter,...payload}
  },
  setVolunteerPageMeta(state, payload){
    
    state.volunteerPage.count = payload.count
    state.volunteerPage.next = (payload.next) ? true : false
    state.volunteerPage.previous = (payload.previous) ? true : false
  },
  setVolunteerPage(state, payload){
    state.volunteerPage.current = payload
  }
  
};
const actions = {
  reqGetVolunteers(context) {
    context.commit("setIsLoading", true);
    axios
      .get(context.rootState.baseAPIurl +
         "/api/volunteers/"
         +"?id="+context.state.volunteerFilter.id
         +"&tz_number="+context.state.volunteerFilter.tz_number
         +"&first_name="+context.state.volunteerFilter.first_name
         +"&last_name="+context.state.volunteerFilter.last_name
         +"&city="+context.state.volunteerFilter.city
         +"&phone_number="+context.state.volunteerFilter.phone_number
         +"&phone_number="+context.state.volunteerFilter.phone_number
         +"&page="+context.state.volunteerPage.current
         +"&pageSize=25"
         , {
        headers: {
          Authorization: "Token " + context.rootState.hamalAuth.accessToken,
        },
      })
      .then((response) => {
        context.commit("setVolunteersList", response.data.results);
        context.commit("setVolunteerPageMeta", {
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
        });
        context.commit("setIsLoading", false);
        console.log(response);
      })
      .catch((err) => {
        context.commit("setIsLoading", false);
        console.log(err);
      });
  },

  reqCreateVolunteer(context) {
    context.commit("setIsLoading", true);
    axios
      .post(
        context.rootState.baseAPIurl + "/api/registration/",
        {
          ...context.state.VolunteerSignUpFields,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        context.commit("setIsLoading", false);
        context.commit("setCreateVolunteerFailed", false);
        router.push({ name: "VolunteerThankYou" });
        console.log(response);
      })
      .catch((err) => {
        context.commit("setIsLoading", false);
        context.commit("setCreateVolunteerFailed", true);
        console.log(err);
      });
  },

  reqCreateHelpRequest(context) {
    axios
      .post(
        context.rootState.baseAPIurl + "/api/createhelprequest/",
        {
          ...context.state.helpRequestFields,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },



  // reqGetOpenHelpRequests(context) {
  //   axios
  //     .get(context.rootState.baseAPIurl + "/api/maphelprequests/", {
  //       headers: {
  //         Authorization: "Token " + context.rootState.hamalAuth.accessToken,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },
  reqGetAreas(context) {
    axios
      .get(context.rootState.baseAPIurl + "/api/areas/", {
        headers: {
          Authorization: "Token " + context.rootState.hamalAuth.accessToken,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  reqCitiesAutoComplete(context, payload) {
    let cityName = payload;

    axios
      .get(
        context.rootState.baseAPIurl +
          "/api/cityautocomplete/?name__startswith=" +
          cityName
      )
      .then((response) => {
        context.commit("setCitiesList", response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },


};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
