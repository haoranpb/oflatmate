<template>
  <input
    class="input"
    type="text"
    autocomplete="off"
    :class="{ 'input-solid': solid, 'input-simple': !solid }"
  />
</template>

<script>
export default {
  props: {
    solid: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.input {
  @apply block text-sm w-full shadow-sm rounded-md;
}

.input-solid {
  @apply bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0;
}

.input-simple {
  @apply border-gray-300 focus:border-primary-500 focus:ring-primary-500;
}
</style>
