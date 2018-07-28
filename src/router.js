import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component:  () => import('./components/Portfolio.vue')
  },
  {
    name: 'item',
    path: '/item/:id',
    component:  () => import('./components/Item.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('./components/Login.vue'),
    meta: {
      guestOnly: true,
    }
  },
  {
    name: 'logout',
    path: '/logout',
    beforeEnter: (to, from, next) => {
      store.commit('authentication/logout');
      next({ name: 'home' });
    },
    meta: {
      requiresAuth: true,
    }
  },
  {
    name: '404',
    path: '*',
    component:  () => import('./components/NotFound.vue')
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const accessToken = store.state.authentication.accessToken;

  if (to.meta.requiresAuth) {
    if (!accessToken) {
      return next({ name: 'home' });
    }
  }

  if (to.meta.guestOnly) {
    if (accessToken) {
      return next({ name: 'home' });
    }
  }

  return next();
});

export default router;