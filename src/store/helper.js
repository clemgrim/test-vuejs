export const TYPES = {
  SUCCESS: 'success',
  PENDING: 'pending',
  ERROR: 'error',
};

export function createAsyncAction(command, actionType) {
  return async (context, payload) => {
    const { commit } = context;
    const { success, pending, error } = mapActionTypes(actionType);

    commit(pending);

    try {
      const result = await command(payload, context);
      commit(success, result);

      return result;
    } catch (e) {
      commit(error, e);

      return Promise.reject(e);
    }
  };
}

export function createAsyncState(defaultValue) {
  return {
    loaded: false,
    pending: false,
    error: null,
    data: defaultValue
  };
}

export function mapAsyncMutations(type) {
  const { success, pending, error } = mapActionTypes(type);

  return {
    [success](state, result) {
      state[type].loaded = true;
      state[type].data = result;
      state[type].error = null;
      state[type].pending = false;
    },
    [pending](state) {
      state[type].pending = true;
    },
    [error](state, e) {
      state[type].error = e;
      state[type].pending = false;
    }
  };
}

export function mapActionTypes(name) {
  let types = {};

  for (let k in TYPES) {
    types[TYPES[k]] = getAsyncMutationName(name, TYPES[k]);
  }

  return types;
}

export function getAsyncMutationName(name, type) {
  return `${name}_${type}`;
}

export function mapAsyncState(name, command, defaultValue) {
  return {
    state: {
      [name]: createAsyncState(defaultValue),
    },
    actions: {
      ['query_' + name]: createAsyncAction(command, name),
    },
    mutations: {
      ...mapAsyncMutations(name),
    },
  };
}