<template>
  <img
    v-if="link"
    class="inline-block avatar-ring"
    :class="sizeClass"
    :src="link"
  />
  <i v-else class="fas fa-user-circle avatar-ring" :class="sizeIcon"></i>
</template>

<script>
export default {
  props: {
    link: String,
    large: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sizeClass() {
      return this.large ? ['h-24', 'w-24'] : ['h-8', 'w-8']
    },
    sizeIcon() {
      return this.large ? 'text-8xl' : 'fa-2x'
    },
  },
}
</script>

<style scoped>
.avatar-ring {
  @apply rounded-full ring-2 ring-white;
}
</style>
