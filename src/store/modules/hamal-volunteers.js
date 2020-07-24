import axios from "axios";

const state = {
    isLoading: false,
    currentPage: 1,
    isSnackbarVisible: false,
    message: '',
    volunteers: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    filter: {
        first_name: '',
        last_name: '',
        phone_number: '',
        tz_number: '',
        city_filter: '',
        areas: '',
        organization: ''
    },
    dialog: {
        isVisible: false,
        isLoading: false,
        volunteer: {},
        expiration_date: '',
    },
};

const getters = {
    getVolunteers: (state) => {
        return state.volunteers.results;
    },
    getAllVolunteersCount: (state) => {
        return state.volunteers.count;
    },
    getShownResultsCount: (state) => {
        return state.volunteers.results.length;
    },
    getIsLoading: (state) => {
        return state.isLoading;
    },
    getFilterPhone: (state) => {
        return state.filter.phone_number;
    },
    getFilterTz: (state) => {
        return state.filter.tz_number;
    },
    getFilterCity: (state) => {
        return state.filter.city;
    },
    getFilterAreas: (state) => {
        return state.filter.areas;
    },
    getFilterOrganization: (state) => {
        return state.filter.organization;
    },
    getCurrentPage: (state) => {
        return state.currentPage;
    },
    getNextPage: (state) => {
        return state.volunteers.next;
    },
    getPreviousPage: (state) => {
        return state.volunteers.previous;
    },
    getDialogIsVisible: (state) => {
        return state.dialog.isVisible;
    },
    getDialogVolunteer: (state) => {
        return state.dialog.volunteer;
    },
    getDialogExpirationDate: (state) => {
        return state.dialog.expiration_date;
    },
    getMessage: (state) => {
        return state.message;
    },
    getIsSnackbarVisible: (state) => {
        return state.isSnackbarVisible;
    },
    getFocusedVolunteerDetails: (state)=>{ //del?
        return state.focusedVolunteer
}
};

const mutations = {
    setVolunteers(state, volunteers) {
        // console.log(volunteers);
        state.volunteers = volunteers;
    },
    setIsLoading(state, isLoading) {
        state.isLoading = isLoading;
    },
    setFilterPhone(state, value) {
        state.filter.phone_number = value;
    },
    setFilterTz(state, value) {
        state.filter.tz_number = value;
    },
    setFilterCity(state, value) {
        state.filter.city_filter = value;
    },
    setFilterAreas(state, value) {
        state.filter.areas = value;
    },
    setFilterOrganization(state, value) {
        state.filter.organization = value;
    },
    setCurrentPage(state, value) {
        state.currentPage = value;
    },
    setDialogIsVisible(state, value) {
        state.dialog.isVisible = value;
    },
    setDialogVolunteer(state, value) {
        state.dialog.volunteer = value;
    },
    setDialogExpirationDate(state, value) {
        state.dialog.expiration_date = value;
    },
    setMessage(state, value) {
        state.message = value;
    },
    setIsSnackbarVisible(state, value) {
        state.isSnackbarVisible = value;
    },
    setFocusedVolunteerDetails(state, payload) { //del?
        state.focusedVolunteer = {
            ...state.focusedVolunteer,
            ...payload,
        };
    }
};

const actions = {
    // async loadFirstPage({ commit, rootState }) {
    //     commit('setIsLoading', true);
    //     try {
    //         const volunteers = await axios.get(`${rootState.baseAPIurl}/api/volunteers`,
    //             {
    //                 headers: {
    //                     Authorization: "Token " + rootState.hamalAuth.accessToken,
    //                 },
    //             })
    //         commit('setVolunteers', volunteers.data);
    //         commit('setCurrentPage', 1);
    //         commit('setIsLoading', false);
    //     } catch (err) {
    //         commit('setIsLoading', false);
    //         console.log(err);
    //     }
    //

    async reqVolunteerDetailsById(context, volunteer_id) {
        console.log(volunteer_id)
        try {
            let volunteer = await axios.get(context.rootState.baseAPIurl+"/api/volunteers/?id="+volunteer_id,
                {
                    headers: {
                        Authorization: "Token " + context.rootState.hamalAuth.accessToken,
                    },
                })
            return volunteer
        }
        catch (e) {
            console.log(e)
            return e
        }

    },

    //  reqVolunteerDetailsById(context, volunteer_id) {
    //      context.commit('setIsLoading', true);
    //     console.log(volunteer_id)
    //      axios.get(context.rootState.baseAPIurl+"/api/volunteers/?id="+volunteer_id,
    //         {
    //             headers: {
    //                 Authorization: "Token " + context.rootState.hamalAuth.accessToken,
    //             },
    //         }).then((volunteer) => {
    //             console.log(volunteer)
    //          context.commit("setFocusedVolunteerDetails", volunteer.data.results[0]);
    //          context.commit('setIsLoading', false);
    //     }).catch((err)=>{
    //         console.log(err)
    //          context.commit('setIsLoading', false);
    //     })
    // },
    loadFirstPage({commit, rootState}) {
        commit('setIsLoading', true);
        axios.get(`${rootState.baseAPIurl}/api/volunteers`,
            {
                headers: {
                    Authorization: "Token " + rootState.hamalAuth.accessToken,
                },
            }).then(volunteers => {
            commit('setVolunteers', volunteers.data);
            commit('setCurrentPage', 1);
            commit('setIsLoading', false);
        }).catch(err=>{
            console.log(err)
            commit('setIsLoading', false);
        })
    },
    async loadFilteredVolunteers({commit, dispatch, rootState, state}) {
        commit('setIsLoading', true);
        if (!state.filter.phone_number && !state.filter.tz_number && !state.filter.city_filter && !state.filter.areas && !state.filter.organization) {
            dispatch('loadFirstPage');
            commit('setIsLoading', false);
            return;
        }
        try {
            const volunteers = await axios.get(`${rootState.baseAPIurl}/api/volunteers/`,
                {
                    params: {
                        phone_number: state.filter.phone_number,
                        tz_number: state.filter.tz_number,
                        city: state.filter.city_filter,
                        areas: state.filter.areas,
                        organization: state.filter.organization
                    },
                    headers: {
                        Authorization: "Token " + rootState.hamalAuth.accessToken,
                    },
                })
            commit('setVolunteers', volunteers.data);
        } catch (err) {
            console.log(err);
        }
        commit('setIsLoading', false);
    },
    async loadNextPage({commit, rootState, state}) {
        const nextPage = state.volunteers.next;
        const i = nextPage.indexOf('page=');
        const pageNum = nextPage.substring(i + 5);
        commit('setIsLoading', true);
        try {
            const volunteers = await axios.get(nextPage,
                {
                    headers: {
                        Authorization: "Token " + rootState.hamalAuth.accessToken,
                    },
                })
            commit('setVolunteers', volunteers.data);
            commit('setCurrentPage', pageNum);
            commit('setIsLoading', false);
        } catch (err) {
            console.log(err);
        }
    },
    async loadPreviousPage({commit, rootState, state}) {
        const previousPage = state.volunteers.previous;
        const i = previousPage.indexOf('page=');
        const pageNum = previousPage.substring(i + 5);
        commit('setIsLoading', true);
        try {
            const volunteers = await axios.get(previousPage,
                {
                    headers: {
                        Authorization: "Token " + rootState.hamalAuth.accessToken,
                    },
                })
            commit('setVolunteers', volunteers.data);
            if (i === -1) {
                commit('setCurrentPage', 1);
            } else {
                commit('setCurrentPage', pageNum);
            }
            commit('setIsLoading', false);
        } catch (err) {
            console.log(err);
        }
    },
    async setVolunteerFreeze({commit, rootState, state}) {
        try {
            const data = {
                "volunteer": state.dialog.volunteer.id,
                "expiration_date": state.dialog.expiration_date
            };
            const response = await axios.post(`${rootState.baseAPIurl}/api/SetVolunteerFreeze/`, data,
                {
                    headers: {
                        Authorization: "Token " + rootState.hamalAuth.accessToken,
                    }
                }
            )
            commit('setMessage', `קביעת תאריך נקבעה בהצלחה ל ${response.data.expiration_date}`);
            commit('setIsSnackbarVisible', true);
            commit('setDialogIsVisible', false);
        } catch (err) {
            commit('setMessage', 'שגיאה, נסה לבחור תאריך אחר.');
            commit('setIsSnackbarVisible', true);
            commit('setDialogIsVisible', false);
        }
    },
    async updatevolunteer({commit, rootState, state}, volunteer) {
        try {
            //console.log(volunteer.id);
            //console.log(volunteer);
            let v = volunteer;
            const data = {
                "tz_number": v.tz_number,
                "first_name": v.first_name,
                "last_name": v.last_name,
                "city": v.city.name,
                "address": v.address,
                "phone_number": v.phone_number,
                "email": v.email,
            };
            const response = await axios.patch(`${rootState.baseAPIurl}/api/updatevolunteer/${volunteer.id}/`, data,
                {
                    headers: {
                        Authorization: "Token " + rootState.hamalAuth.accessToken,
                    }
                }
            )
            commit('setMessage', 'מתנדב עודכן בהצלחה');
            commit('setIsSnackbarVisible', true);
            commit('setDialogIsVisible', false);
        } catch (err) {
            console.log(err);
            commit('setMessage', 'שגיאה');
            commit('setIsSnackbarVisible', true);
            commit('setDialogIsVisible', false);
        }
    },
    openNewDialog({commit}, volunteer) {
        commit('setDialogIsVisible', true);
        commit('setDialogVolunteer', volunteer);
        commit('setDialogExpirationDate', '');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};