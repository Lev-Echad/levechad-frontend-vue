import Vue from "vue";
import Vuex from "vuex";
import hamal from "./modules/hamal";
import volunteerSignup from "./modules/volunteer-signup";
import hamalAuth from "./modules/hamal-auth";
import match from "./modules/match";
import helpRequests from "./modules/help-requests";
import api from "./modules/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseAPIurl: "https://live.levechad.org",
    helpTypes: [
      {
        value: "BUYIN",
        display_name: "קניות",
      },
      {
        value: "TRAVEL",
        display_name: "איסוף",
      },
      {
        value: "MEDICI",
        display_name: "תרופות",
      },
      {
        value: "HOME_HEL",
        display_name: "עזרה בבית",
      },
      {
        value: "PHONE_HEL",
        display_name: "תמיכה טלפונית",
      },
      {
        value: "VITAL_WORK",
        display_name: "סיוע לעובדים חיוניים",
      },
      {
        value: "OTHER",
        display_name: "אחר",
      },
    ],
    requestReasons:[
      {
          "value": "ISOLATION",
          "display_name": "בידוד"
      },
      {
          "value": "HIGH_RISK_GROUP",
          "display_name": "קבוצת סיכון גבוהה"
      },
      {
          "value": "OTHER",
          "display_name": "אחר"
      }
  ]
  },
  getters: {
    getHelpTypes(state){
      return state.helpTypes
    },
    getRequestReasons(state){
      return state.requestReasons
    }
  },
  mutations: {},
  actions: {},
  modules: {
    hamal,
    volunteerSignup,
    api,
    hamalAuth,
    match,
    helpRequests
  },
});
