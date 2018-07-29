<template>
  <div class="site-header">
    <router-link :to="{ name: 'home' }">
      <img src="../assets/logo.png">
    </router-link>
    <HeaderMenu />
  </div>
</template>

<script>
import HeaderMenu from './HeaderMenu.vue';

export default {
  name: 'SiteHeader',
  components: {
    HeaderMenu,
  }
}
</script>

<style lang="scss">
</style>
