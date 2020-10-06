import Vue from "vue";
import Vuex from "vuex";
import hamal from "./modules/hamal";
import hamalAuth from "./modules/hamal-auth";
import match from "./modules/match";
import market from "./modules/market";
import helpRequests from "./modules/help-requests";
import api from "./modules/api";
import hamalVolunteers from "./modules/hamal-volunteers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseAPIurl: process.env.VUE_APP_API_URL,
    helpTypes: [
      {
        value: "BUYIN",
        display_name: "ביצוע קניות למבודדים",
      },
      {
        value: "TRAVEL",
        display_name: "קבלת סל מזון",
      },
      {
        value: "MEDICI",
        display_name: "איסוף תרופות מבית מרקחת",
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
    api,
    hamalAuth,
    match,
    market,
    helpRequests,
    hamalVolunteers
  },
});
