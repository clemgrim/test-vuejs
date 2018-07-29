import { mapState, mapGetters } from 'vuex';
import store from '../store';
import http, { refreshToken } from '../api';

export default {
  install: (Vue) => {
    // Attach the access token to the request
    http.interceptors.request.use((config) => {
      const token = store.state.authentication.accessToken;
    
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    
      return config;
    });
    
    // Refresh the access token and replay the request if we have a 401 response
    http.interceptors.response.use(null, ({ config, response }) => {
      if (response.status === 401) {
        const token = store.state.authentication.refreshToken;
    
        if (token) {
          return refreshToken(token)
            .then(({ access_token, refresh_token }) => {
              store.commit('authentication/setAccessToken', { access_token, refresh_token });
            })
            .then(() => http.request(config))
            .catch(() => store.commit('authentication/logout'));
        }
      }
    
      return Promise.reject(response);
    });

    Vue.mixin({
      computed: {
        ...mapState('authentication', { identityState: 'identity' }),
        ...mapGetters('authentication', ['identity', 'isGuest'])
      },
    });
  }
}