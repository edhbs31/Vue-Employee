//import Vue from 'vue';
import { createStore } from 'vuex'
import login from './login';
import Register from './register';
import user from './user';

export default createStore({
  modules: {
    login,
    Register,
    user
  },
});