<template>
  <div class="PortfolioItem">
    <div class="PortfolioItem__title">
      {{ item.title }}
    </div>
    <div class="PortfolioItem__picture__container">
      <img :src="item.picture" :alt="item.title" class="PortfolioItem__picture">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped lang="scss">
  .PortfolioItem {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(#000, .25);
    }

    &__picture {
      max-width: 100%;
      height: auto;
      display: block;
    }

    &__title {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80%;
      transform: translate(-50%, -50%);
      font-size: 35px;
      color: #fff;
      text-transform: uppercase;
    }
  }
</style>
