const state = {
  currentStep: 1,
  steps: {
    1: {
      stepNo: 1,
      stepTitle: "הנחיות",
      isValid: false,
      stepComponent: "Terms"
     },
    2: {
      stepNo: 2,
      stepTitle: "פרטים אישיים",
      isValid: true,
      stepComponent: "PersonalDetails"
     },
    3: {
      stepNo: 3,
      stepTitle: "כתובת",
      isValid: true,
      stepComponent: "Address"
     },
    4: {
      stepNo: 4,
      stepTitle: "משימות",
      isValid: true,
      stepComponent: "MissionTypes"
     },
    5: {
      stepNo: 5,
      stepTitle: "התניידות",
      isValid: false,
      stepComponent: "Transportation"
     },
    6: {
      stepNo: 6,
      stepTitle: "פרטי התקשרות",
      isValid: true,
      stepComponent: "Contact"
     },
    7: {
      stepNo: 7,
      stepTitle: "אישור טלפון",
      isValid: false,
      stepComponent: "PhoneVarification"
     },

  }

  
};
const getters = {
  getCurrentStep(state){
    return state.currentStep
  }
};

const mutations = {
  increaseStep(state){
    console.log(state.currentStep)
    state.currentStep++
  },
  setStetValidation(state, payload){
    // console.log(payload)
    state.steps[payload.stepNo].isValid = payload.isValid
  }
};
const actions = {
  increaseStep({ commit }){
    commit('increaseStep')
  },
  setStetValidation({ commit }, payload){
    // console.log(payload)
    commit('setStetValidation', payload)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
