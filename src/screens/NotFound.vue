<template>
  <div class="NotFound">
    <h1>Sorry, page no found</h1>
    <p>
      Try again or go to the <router-link :to="{ name: 'home' }">home page</router-link>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  metaInfo() {
    return {
      title: 'Page not found',
    };
  }
}
</script>

<style lang="scss">
</style>
