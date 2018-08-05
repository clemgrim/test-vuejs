<template>
  <div class="Portfolio__container">
    <PortfolioItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      @click.native="goToDetails(item)"
      class="Portfolio__item"
    />
  </div>
</template>

<script>
import PortfolioItem from './PortfolioItem.vue';

export default {
  name: 'ArticleList',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    PortfolioItem,
  },
  methods: {
    goToDetails(item) {
      this.$router.push({ name: 'article', params: { id: item.id } });
    }
  },
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
