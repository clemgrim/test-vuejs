<template>
  <nav class="HeaderMenu">
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link to="/about-us">About us</router-link>
    <router-link to="/contact">Contact</router-link>
    <router-link to="/notifications" v-if="identity">
      Notifications
      <HeaderMenuNotificationCount />
    </router-link>
    <router-link :to="{ name: 'logout' }" v-if="identity">
      Logout
    </router-link>
    <router-link :to="{ name: 'login' }" v-else>
      Login
    </router-link>
  </nav>
</template>

<script>
import HeaderMenuNotificationCount from './HeaderMenuNotificationCount.vue';

export default {
  name: 'HeaderMenu',
  components: {
    HeaderMenuNotificationCount,
  },
}
</script>

<style lang="scss" scoped>
.HeaderMenu {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  a {
    text-transform: uppercase;
    font-size: 16px;
    text-decoration: none;
    color: #333;
    padding: 10px 20px;
  }

  .router-link-exact-active,
  a:hover {
    color: #fff;
    background-color: #333;
  }
}
</style>
