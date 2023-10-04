'use strict';
import API from '../plugins/http';
const Register = {
  namespaced: true,
  state: {
    auth: [],
    isSuccess: false,
    isLoading: false,
    successMessage: null,
    isError: false,
  },
  getters: {
    auth: (state) => state.auth,
  },
  actions: {
    // for Register action
    async RegisterAction({ commit }, state) {
      commit('setLoading', true);
      commit('setSuccess', false);
      commit('setError', false);
      try {
        const response = await API.post('/register', state);
        return response;
       
      } catch (error) {
        return error.response;
      }
     },
  },
  mutations: {
    setSuccess(state, data) {
      state.isSuccess = data;
    }, 
    setLoading(state, data) {
      state.isLoading = data;
    },
    setSuccessMessage(state, data) {
      state.successMessage = data;
    },
    setError(state, data) {
      state.isError = data;
    },
  },
};
export default Register;
