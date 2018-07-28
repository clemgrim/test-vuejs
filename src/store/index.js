import Vue from 'vue';
import Vuex from 'vuex';
import portfolio from './modules/portfolio';
import notifications from './modules/notifications';
import authentication from './modules/authentication';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    portfolio,
    notifications,
    authentication,
  },
  strict: debug,
});