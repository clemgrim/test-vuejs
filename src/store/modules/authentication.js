import * as api from '../../api';
import { mapAsyncState } from '../helper';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const getIdentity = (payload, { state }) => {
  if (state.accessToken) {
    return api.getIdentity()
      .catch(response => {
        if (response.status === 401) {
          return Promise.resolve(null);
        }
      });
  }

  return Promise.resolve(null);
};

const doLogin = ({ username, password }, { commit, dispatch }) => {
  return api.login(username, password)
    .then(({ access_token, refresh_token }) => {
      commit('setAccessToken', { access_token, refresh_token });
    })
    .then(() => dispatch('query_identity'));
};

// initial state
const state = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || '',
};

// actions
const actions = {};

// getters
const getters = {
  identity: (state) => state.identity.data,
  isGuest: (state) => !state.identity.data,
};

// mutations
const mutations = {
  setAccessToken: (state, { access_token, refresh_token }) => {
    state.accessToken = access_token;
    state.refreshToken = refresh_token;
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  },
  logout: (state) => {
    state.accessToken = '';
    state.identity.data = null;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

const identityState = mapAsyncState('identity', getIdentity, null);
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