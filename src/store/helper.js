export const TYPES = {
  SUCCESS: 'success',
  PENDING: 'pending',
  ERROR: 'error',
};

export function queryAction(command, actionType) {
  return async ({ commit }, ...args) => {
    const { success, pending, error } = mapActionTypes(actionType);

    commit(pending);

    try {
      const result = await command(...args);
      commit(success, result);
    } catch (e) {
      commit(error, e);
    }
  };
}

export function mapStateMutations(type) {
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

export function mapStateData(defaultValue) {
  return {
    loaded: false,
    pending: false,
    error: null,
    data: defaultValue
  };
}

export function mapActionTypes(name) {
  let types = {};

  for (let k in TYPES) {
    types[TYPES[k]] = suffixMutation(name, TYPES[k]);
  }

  return types;
}

export function suffixMutation(name, type) {
  return `${name}_${type}`;
}