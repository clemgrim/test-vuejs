import * as api from '../../api';
import { mapStateMutations, mapStateData, queryAction } from '../helper';

// initial state
const state = {
  list: mapStateData([]),
  item: mapStateData({})
};

// getters
const getters = {
  itemCount: (state) => state.list.data.length
};

// actions
const actions = {
  getAllItems: queryAction(() => api.getAllArticles(), 'list'),
  findItem: queryAction((id) => api.findArticle(id), 'item')
};

// mutations
const mutations = {
  ...mapStateMutations('list'),
  ...mapStateMutations('item'),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};