import Vue from 'vue';
import Vuelidate from 'vuelidate';
import store from './store';
import router from './router';
import App from './App.vue';
import AuthenticationPlugin from './plugins/authentication';

Vue.config.productionTip = true;

Vue.use(AuthenticationPlugin);
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
