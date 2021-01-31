<template>
  <img
    class="rounded-full inline-block ring-2 ring-white"
    :class="sizeClass"
    :src="link"
  />
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sizeClass() {
      return this.large ? ['h-18', 'w-18'] : ['h-8', 'w-8']
    },
  },
}
</script>
