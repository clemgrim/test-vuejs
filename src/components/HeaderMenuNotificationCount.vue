<template>
  <span v-if="notifCountState.loaded && notifCountState.data > 0">
    ({{ notifCountState.data }})
  </span>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HeaderMenuNotificationCount',
  computed: {
    ...mapState('notifications', { notifCountState: 'count' })
  },
  created() {
    if (this.identity) {
      this.$store.dispatch('notifications/query_count');
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
