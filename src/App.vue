<template>
  <div id="app" v-if="identityState.loaded">
    <SiteHeader />
    <router-view class="site-container"></router-view>
    <Footer />
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import SiteHeader from './components/Header.vue';

export default {
  name: 'app',
  components: {
    SiteHeader,
  },
  created() {
    this.$store.dispatch('authentication/query_identity');
  }
}
</script>

<style lang="scss">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
}

.site-container {
  max-width: 900px;
  margin: auto;
}
</style>
