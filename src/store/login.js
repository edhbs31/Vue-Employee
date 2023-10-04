'use strict';
import API from '../plugins/http';
const login = {
  namespaced: true,
  state: {
    auth: [],
    isSuccess: false,
    isLoading: false,
    statusCode: null,
    successMessage: null,
    item_id: [],
    isPage: false,
    isErrorPage: false,
    token: null,
    isError: false,
    isKey: false,
    key: null,
    qrCode: null,
  },
  getters: {
    auth: (state) => state.auth,
  },
  actions: {
    async loginAction({ commit }, state) {
      commit('setLoading', true);
      commit('setSuccess', false);
      commit('setError', false);
      try {
        const response = await API.post('/login', state);
        return response;
      } catch (error) {
        
        let message = error.response.data.message;
        if (!message) {
          message = 'Username Or Password Incorrect';
        }
        console.log("this is  error", error.response.data)
        return error.response
      }
    },
    
  },
  mutations: {
    setItem_id(state, data) {
      state.item_id = data;
    },
    setSuccessMessage(state, data) {
      state.successMessage = data;
    },
    setItems(state, item) {
      state.items = item;
    },
    setLoading(state, data) {
      state.isLoading = data;
    },
    setSuccess(state, data) {
      state.isSuccess = data;
    },
    setStatusCode(state, data) {
      state.statusCode = data;
    },
    setToken(state, data) {
      state.token = data;
    },
    setError(state, data) {
      state.isError = data;
    },
    setPage(state, data) {
      state.isPage = data;
    },
    setErrorPage(state, data) {
      state.isErrorPage = data;
    },
    setIsKey(state, data) {
      state.isKey = data;
    },
    setKey(state, data) {
      state.key = data;
    },
    setQrCode(state, data) {
      state.qrCode = data;
    },
  },
};

export default login;
