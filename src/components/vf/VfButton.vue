<template>
  <button
    class="btn btn-focus"
    :class="{
      'btn-warn': warn,
      'btn-danger': danger,
      'btn-primary': primary,
      'btn-plain': plain,
      'btn-large': large,
      'btn-middle': !large,
    }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    warn: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.btn {
  @apply text-sm font-medium inline-flex justify-center rounded-md border w-auto;
}

.btn-focus {
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500;
}

.btn-warn {
  @apply text-red-600 border-gray-300 bg-white hover:bg-gray-50;
}

.btn-danger {
  @apply border-transparent bg-red-600 text-white hover:bg-red-700;
}

.btn-primary {
  @apply border-transparent text-white bg-primary-600 hover:bg-primary-700;
}

.btn-plain {
  @apply border-gray-300 bg-white text-gray-700 hover:bg-gray-50;
}

.btn-large {
  @apply px-4 py-2;
}

.btn-middle {
  @apply px-3 py-1;
}
</style>
