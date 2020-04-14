import axios from "axios";

const state = {
  volunteersList: null
};
const getters = {
  getVolunteers(state) {
    return state.volunteersList;
  }
};

const mutations = {
  setVoltuneersList({ state }, payload) {
    console.log("blabla");
  }
};
const actions = {
  getVolunteers({ state }) {
    // console.log("YOYO");
    // axios
    //   .get("http://localhost:7000/api/volunteers/")
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },

  createVolunteer(payload) {
    axios
      .post(
        "http://localhost:7000/api/registration/",
        {
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
            parent_name: "",
            parent_id: ""
          },
          languages: []
        },
        {
          headers: {
            "Content-Type": "application/json",
            
          }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
