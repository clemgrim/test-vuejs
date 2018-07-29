import * as api from '../../api';
import { mapStateMutations, mapStateData, mapActionTypes, queryAction } from '../helper';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const getIdentity = () => {
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

// initial state
const state = {
  identity: mapStateData(null),
  login: mapStateData(null),
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || '',
};

// actions
const actions = {
  getIdentity: queryAction(() => getIdentity(), 'identity'),
  login: ({ commit, dispatch }, { username, password }) => {
    const { success, pending, error } = mapActionTypes('login');

    commit(pending);

    return api.login(username, password)
      .then(({ access_token, refresh_token }) => {
        commit(success, true);
        commit('setAccessToken', { access_token, refresh_token });
      })
      .then(() => dispatch('getIdentity'))
      .catch(e => {
        commit(error, e);
        return Promise.reject(e);
      });
  },
};

// getters
const getters = {
  identity: (state) => state.identity.data,
  isGuest: (state) => !state.identity.data,
};

// mutations
const mutations = {
  ...mapStateMutations('identity'),
  ...mapStateMutations('login'),
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

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};