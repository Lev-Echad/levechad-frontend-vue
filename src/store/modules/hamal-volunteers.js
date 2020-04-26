import axios from "axios";

const state = {
    isLoading: false,
    currentPage: 1,
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
        city: '',
        areas: '',
        organization: ''
    }
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
    }
};

const mutations = {
    setVolunteers(state, volunteers) {
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
        state.filter.city = value;
    },
    setFilterAreas(state, value) {
        state.filter.areas = value;
    },
    setFilterOrganization(state, value) {
        state.filter.organization = value;
    },
    setCurrentPage(state, value) {
        state.currentPage = value;
    }
};

const actions = {
    async loadFirstPage({ commit, rootState }) {
        commit('setIsLoading', true);
        try {
            const volunteers = await axios.get(`${rootState.baseAPIurl}/api/volunteers`,
                {
                    headers: {
                        Authorization: "Token " + rootState.hamalAuth.accessToken,
                    },
                })
            commit('setVolunteers', volunteers.data);
            commit('setCurrentPage', 1);
        } catch (err) {
            console.log(err);
        }
        commit('setIsLoading', false);
    },
    async loadFilteredVolunteers({ commit, dispatch, rootState, state }) {
        commit('setIsLoading', true);
        if (!state.filter.phone_number && !state.filter.tz_number && !state.filter.city && !state.filter.areas && !state.filter.organization) {
            dispatch('loadFirstPage');
            return;
        }
        try {
            const volunteers = await axios.get(`${rootState.baseAPIurl}/api/volunteers/`,
                {
                    params: {
                        phone_number: state.filter.phone_number,
                        tz_number: state.filter.tz_number,
                        city: state.filter.city,
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
    async loadNextPage({ commit, rootState, state }) {
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
    async loadPreviousPage({ commit, rootState, state }) {
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};