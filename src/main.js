import Vue from 'vue';
import Vuelidate from 'vuelidate';
import store from './store';
import router from './router';
import App from './App.vue';
import http, { refreshToken } from './api';
import AuthenticationPlugin from './plugins/authentication';

http.interceptors.request.use((config) => {
  const token = store.state.authentication.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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

Vue.config.productionTip = false;

Vue.use(AuthenticationPlugin);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
