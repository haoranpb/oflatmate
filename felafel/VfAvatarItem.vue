<template>
  <img class="inline-block avatar-ring" :class="sizeClass" :src="avatarUrl" />
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: './user-circle-solid.svg',
    },
    middle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sizeClass() {
      switch (true) {
        case this.middle:
          return ['h-14', 'w-14']
        default:
          return ['h-8', 'w-8']
      }
    },
    avatarUrl() {
      return this.link ? this.link : '/user-circle-solid.svg'
    },
  },
}
</script>

<style scoped>
.avatar-ring {
  @apply rounded-full ring-2 ring-white;
}
</style>
