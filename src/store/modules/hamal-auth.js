import { axiosBase } from "../../api/axios-base";
import axios from "axios"
const state = {
  accessToken: localStorage.getItem("access_token") || null, // makes sure the user is logged in even after
  // refreshing the page
  APIData: "", // received data from the backend API is stored here.
  isLoggedIn: false,
  googleAPIkey: ''
};
const getters = {
  loggedIn(state) {
    return state.isLoggedIn;
  },
  googleAPIkey(state) {
    return state.googleAPIkey;
  },
};

const mutations = {
  updateLocalStorage(state, { access }) {
    localStorage.setItem("access_token", access);
    state.isLoggedIn = true;
    state.accessToken = access;
  },
  updateAccess(state, access) {
    state.accessToken = access;
  },
  destroyToken(state) {
    localStorage.setItem("access_token", null);
    state.isLoggedIn = false;
    state.accessToken = null;
  },
  updateLogin(state, payload){
    state.isLoggedIn = payload;
  },
  googleAPIkey(state, payload){
    state.googleAPIkey = payload;
  }
};
const actions = {
  // run the below action to get a new access token on expiration
  refreshToken(context) {
    return new Promise((resolve, reject) => {
      axiosBase
        .post("/api/token/refresh/", {
          refresh: context.state.refreshToken,
        }) // send the stored refresh token to the backend API
        .then((response) => {
          // if API sends back new access and refresh token update the store
          console.log("New access successfully generated");
          context.commit("updateAccess", response.data.access);
          resolve(response.data.access);
        })
        .catch((err) => {
          console.log("error in refreshToken Task");
          reject(err); // error generating new access and refresh token because refresh token has expired
        });
    });
  },
  registerUser(context, data) {
    // return new Promise((resolve, reject) => {
    //   axiosBase.post('/register', {
    //     name: data.name,
    //     email: data.email,
    //     username: data.username,
    //     password: data.password,
    //     confirm: data.confirm
    //   })
    //     .then(response => {
    //       resolve(response)
    //     })
    //     .catch(error => {
    //       reject(error)
    //     })
    // })
  },
  logoutUser(context) {
    context.commit("destroyToken")
  },
  loginUser( {commit, rootState}, credentials) {
    return new Promise((resolve, reject) => {
      // send the username and password to the backend API:
    //  axiosBase
    
      axios.post(rootState.baseAPIurl+"/api/authtoken/", {
          username: credentials.username,
          password: credentials.password,
        })
        //if successful update local storage:
        .then((response) => {
          console.log(response)
          commit("updateLocalStorage", {
            access: response.data.token,
          }); // store the access and refresh token in localstorage
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  checkToken({commit, rootState}){
    commit("updateLogin", true) //first 
     axios.get(rootState.baseAPIurl+"/api/volunteers/",{
      headers:{
        Authorization: "Token " + state.accessToken
      }
    } )
    //if successful update local storage:
    .then((response) => {
      commit("updateLogin", true)
    })
    .catch(err => {
      commit("updateLogin", false)
    })
  },

  // called from hamal master view 
  // getGoogleAPIkey({commit, rootState}){
  //    axios.get(rootState.baseAPIurl+"/api/getGoogleApiSecret/",{
  //     headers:{
  //       Authorization: "Token " + state.accessToken
  //     }
  //   } )
  //   //if successful update local storage:
  //   .then((response) => {
  //     commit("googleAPIkey", response.secret_key)
  //   })
  //   .catch(err => {
  //     commit("googleAPIkey", '')
  //   })
  // },
  getGoogleAPIkey({commit, rootState}){
    return new Promise((resolve, reject) => {
      axios.get(rootState.baseAPIurl+"/api/getGoogleApiSecret/",{
        headers:{
          Authorization: "Token " + state.accessToken
        }
      } )
      //if successful update local storage:
      .then((response) => {
        commit("googleAPIkey", response.data.secret_key)
        resolve(response.data.secret_key)
      })
      .catch(err => {
        commit("googleAPIkey", '')
        reject('')
      })
    })

  },

};


export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
