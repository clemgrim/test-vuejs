<template>
  <nav class="HeaderMenu">
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link to="/shop">Shop</router-link>
    <router-link to="/about-us">About us</router-link>
    <router-link to="/contact">Contact</router-link>
    <router-link to="/notifications" v-if="identity">
      Notifications
      <span v-if="notifCountState.loaded && notifCountState.data > 0">
        ({{ notifCountState.data }})
      </span>
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
import { mapState } from 'vuex';

export default {
  name: 'header-menu',
  computed: {
    ...mapState('notifications', { notifCountState: 'count' })
  },
  created() {
    if (this.identity) {
      this.$store.dispatch('notifications/getCount');
    }
  }
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
