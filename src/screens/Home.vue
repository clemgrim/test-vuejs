<template>
  <div>
    <Greetings :identity="identity" />
    <ArticleList :items="listState.data" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Greetings from '../components/Greetings.vue';
import ArticleList from '../components/ArticleList.vue';

export default {
  name: 'Home',
  computed: {
    ...mapState('portfolio', {
      listState: 'list'
    }),
  },
  components: {
    ArticleList,
    Greetings,
  },
  created () {
    this.$store.dispatch('portfolio/query_list');
  },
  metaInfo() {
    return {
      title: 'Home',
    };
  }
}
</script>

<style scoped lang="scss">
</style>
