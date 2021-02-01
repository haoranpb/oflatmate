<template>
  <select
    class="select"
    :class="{
      'select-solid': solid,
      'select-simple': !solid,
      'select-small': small,
    }"
  >
    <slot></slot>
  </select>
</template>

<script>
export default {
  props: {
    solid: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.select {
  @apply rounded-md;
}

.select-solid {
  @apply bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0;
}

.select-simple {
  @apply border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50;
}

.select-small {
  @apply py-1 pr-8 pl-2 leading-5;
}
</style>
