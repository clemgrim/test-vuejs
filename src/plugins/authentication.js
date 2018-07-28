import { mapState, mapGetters } from 'vuex';

export default {
  install: (Vue) => {
    Vue.mixin({
      computed: {
        ...mapState('authentication', { identityState: 'identity' }),
        ...mapGetters('authentication', ['identity', 'isGuest'])
      },
    });
  }
}