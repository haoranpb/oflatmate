<template>
  <input
    type="text"
    autocomplete="off"
    class="block text-sm w-full shadow-sm rounded-md"
    :class="[focusClass, solidClass]"
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
  computed: {
    focusClass() {
      return this.solid
        ? ['focus:border-gray-500', 'focus:bg-white', 'focus:ring-0']
        : ['focus:border-indigo-500', 'focus:ring-indigo-500']
    },
    solidClass() {
      return this.solid
        ? ['bg-gray-100', 'border-transparent']
        : ['border-gray-300']
    },
  },
}
</script>
