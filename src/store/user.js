'use strict';
import API from '../plugins/http';
const state = { 
  success:false,
  totalRows: 0,
  isLoading: false,
  isError: false,
  errorMessage: '',
  successMessage:'',
  items: [],
};
const mutations = { 
  setRows(state, data) {
    state.totalRows = data;
  },
  setError(state, data) {
    state.isError = data;
  },
  setErrorMessage(state, data) {
    state.errorMessage = data;
  },
  setSuccessMessage(state, data) {
    state.successMessage = data;
  },
  setSuccess(state, data) {
    state.success = data;
  },
  setItems(state,data) {
    state.items = data;
  },setLoading(state, data) {
    state.isLoading = data;
  },
 };
const actions = {
  async fetchUser({ commit }, state) {
    try {
      
      commit('setSuccessMessage', null);
      commit('setErrorMessage',null);
      commit("setLoading", true);
      commit("setItems", []);
      let url = `/user?limit=${state.limit??10}&page=${state.page??1}`
      if (typeof state.query !== "undefined") {
        url+= `&query=${state.query}`
      } else {
        //url+= `&query=""`
      }
      const response = await API.get(
        url
      );
      commit("setItems", response.data.content);
      commit("setRows", response.data.totalElements);
      commit("setError", false);
      commit("setLoading", false);
    } catch (error) {
      commit("setRows", 0);
      commit("setLoading", false);
      commit("setError", true);
    }
  },async fetchUserAge({ commit }, state) {
    try {
      const serializedData = encodeURIComponent(JSON.stringify(state));
      const url = `/userByAge?data=${serializedData}`;
      const response = await API.get(
        url
      );
      
      return response.data
    } catch (error) {
      commit("setRows", 0);
      commit("setLoading", false);
      commit("setError", true);
    }
  },async getUserByID({ commit }, state) {
    try {
      commit("setItems", null);
      const url = `/userById/${state.id}`;
      const response = await API.get(
        url
      );
      commit("setItems", response.data);
    } catch (error) {
      commit("setRows", 0);
      commit("setLoading", false);
      commit("setError", true);
    }
  }, async updateUser({ commit }, payload) {
    commit("setSuccess", false);
    commit('setSuccessMessage', null);
    let response = null;
    try {
      response = await API.put(`/updateUser`, payload);
    } catch (error) {
      response = error.response;
    }
    commit("setSuccess", response.data.status);
    commit('setSuccessMessage', response.data.message);
  }, async deleteUser({ commit },payload) {
    commit('setError', false);
    let response = null;
    let message = null;
    let result = false;
    const maps= {};
    maps.result = false;
    maps.message = message;
    try {
      response = await API.delete(`/deleteUser/${payload.id}`);
      const allData = response.data;
      console.log("his is", allData)
      result = allData.status;
      message = allData.message;
    } catch (error) {
      if(error.response.data.message.message){
        message = error.response.data.message.message;        
      } else {
        message = 'Internal Server Error';
      }
    }
    maps.result = result;
    maps.message = message;
    return maps;
    
  }
};
const getters = { /* ... */ };

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};