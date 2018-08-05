import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component:  () => import('./screens/Home.vue')
  },
  {
    name: 'article',
    path: '/article/:id',
    component:  () => import('./screens/Article.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('./screens/Login.vue'),
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
    component:  () => import('./screens/NotFound.vue')
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const accessToken = store.state.authentication.accessToken;

  if (to.meta.requiresAuth && !accessToken) {
    return next({ name: 'home' });
  }

  if (to.meta.guestOnly && accessToken) {
    return next({ name: 'home' });
  }

  return next();
});

export default router;