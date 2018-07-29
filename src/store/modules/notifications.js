import * as api from '../../api';
import { mapAsyncState } from '../helper';

const countState = mapAsyncState('count', () => api.getNotificationsCount(), 0);

export default {
  namespaced: true,
  state: {
    ...countState.state,
  },
  actions: {
    ...countState.actions,
  },
  mutations: {
    ...countState.mutations,
  }
};