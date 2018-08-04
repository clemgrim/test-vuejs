<template>
  <div>
    <h1 v-if="identity">Hello {{ identity.name }}</h1>
    <h1 v-else>Hello guest</h1>
    <div class="Portfolio__container">
      <PortfolioItem
        v-for="item in listState.data"
        :key="item.id"
        :item="item"
        @click.native="goToDetails(item)"
        class="Portfolio__item"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PortfolioItem from './PortfolioItem.vue';

export default {
  name: 'Portfolio',
  computed: {
    ...mapState('portfolio', {
      listState: 'list'
    }),
  },
  components: {
    PortfolioItem,
  },
  methods: {
    goToDetails(item) {
      this.$router.push({ name: 'item', params: { id: item.id } });
    }
  },
  created () {
    this.$store.dispatch('portfolio/query_list');
  },
  metaInfo() {
    return {
      title: 'Portfolio',
    };
  }
}
</script>

<style scoped lang="scss">
  .Portfolio {
    &__container {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between
    }

    &__item {
      cursor: pointer;
      flex: 0 0 49%;
      margin-bottom: 20px;
    }
  }
</style>
