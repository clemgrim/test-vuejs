import * as api from '../../api';
import { mapAsyncState } from '../helper';

const doLogin = ({ username, password }, { dispatch }) => {
  return api.login(username, password)
    .then(() => dispatch('query_identity'));
};

// initial state
const state = {};

// actions
const actions = {
  logout: ({ commit}) => api.logout().then(() => commit('clearIdentity')),
};

// getters
const getters = {
  identity: (state) => state.identity.data,
  isGuest: (state) => !state.identity.data,
};

// mutations
const mutations = {
  clearIdentity: (state) => {
    state.identity.data = null;
  },
};

const identityState = mapAsyncState('identity', () => api.getIdentity(), null);
const loginState = mapAsyncState('login', doLogin, null);

export default {
  namespaced: true,
  state: {
   ...state,
   ...identityState.state,
   ...loginState.state,
  },
  getters,
  actions: {
    ...actions,
    ...identityState.actions,
    ...loginState.actions,
  },
  mutations: {
    ...mutations,
    ...identityState.mutations,
    ...loginState.mutations,
  }
};
