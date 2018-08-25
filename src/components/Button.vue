<template functional>
  <button 
    :class="['btn-' + props.size, { 'btn-rounded': props.rounded }]"
    class="btn"
    @click="props.onClick($event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    size: {
      type: String,
      required: false,
      default: 'md',
      validator: (v) => ['xs', 'sm', 'md', 'lg'].includes(v),
    },
    rounded: {
      type: Boolean,
      required: false,
    },
    onClick: {
      type: Function,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 0;
  border: 1px solid #333;
  box-shadow: none;
  color: #333;
  background: #fff;

  &-xs {
    font-size: 13px;
    padding: 4px 8px;
  }

  &-sm {
    font-size: 14px;
    padding: 6px 10px;
  }

  &-md {
    font-size: 14px;
    padding: 8px 12px;
  }

  &-lg {
    font-size: 16px;
    padding: 10px 14px;
  }

  &-rounded {
    border-radius: 4px;
  }
}
</style>
