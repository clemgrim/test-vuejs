<template>
  <div class="portfolio__container">
    <PortfolioItem
      v-for="item in listState.data"
      :key="item.id"
      :item="item"
      @click.native="goToDetails(item)"
      class="portfolio__item"
    />
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
    this.$store.dispatch('portfolio/getAllItems');
  }
}
</script>

<style scoped lang="scss">
  .portfolio {
    &__container {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between
    }

    &__item {
      cursor: pointer;
      flex: 0 0 32%;
      margin-bottom: 20px;
    }
  }
</style>
