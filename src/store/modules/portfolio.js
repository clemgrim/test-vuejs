import * as api from '../../api';
import { mapAsyncState } from '../helper';

const listState = mapAsyncState('list', () => api.getAllArticles(), []);
const itemState = mapAsyncState('item', (id) => api.findArticle(id), {});

export default {
  namespaced: true,
  state: {
    ...listState.state,
    ...itemState.state,
  },
  actions: {
    ...listState.actions,
    ...itemState.actions,
  },
  mutations: {
    ...listState.mutations,
    ...itemState.mutations,
  },
};