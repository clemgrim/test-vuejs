import * as api from '../../api';
import { mapStateMutations, mapStateData, queryAction } from '../helper';

// initial state
const state = {
  count: mapStateData(0),
};

// actions
const actions = {
  getCount: queryAction(() => api.getNotificationsCount(), 'count'),
};

// mutations
const mutations = {
  ...mapStateMutations('count'),
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};