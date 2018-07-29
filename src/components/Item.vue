<template>
  <div class="Article">
    <h1 class="Article__title">
      {{ itemState.data.title }}
    </h1>
    <div class="Article__picture__container">
      <img :src="itemState.data.picture" :alt="itemState.data.title" class="Article__picture">
    </div>
    <div class="Article__description">
      {{ itemState.data.description }}
    </div>
    <div class="Article__social">
      <div class="Article__social__likes Article__social__item">{{ itemState.data.like_count }} likes</div>
      <div class="Article__social__comments Article__social__item">{{ itemState.data.comment_count }} comments</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Item',
  computed: {
    ...mapState('portfolio', {
      itemState: 'item'
    }),
  },
  created () {
    this.$store.dispatch('portfolio/findItem', +this.$route.params.id);
  }
}
</script>

<style lang="scss">
  .Article {
    &__title {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    &__picture {
      max-width: 600px;

      &__container {
        text-align: center;
        margin-bottom: 20px;
      }
    }

    &__social {
      margin-top: 20px;
      border-top: 1px solid #ccc;
      padding-top: 20px;
      display: flex;
      justify-content: flex-end;
      font-size: 14px;

      &__item:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
</style>
