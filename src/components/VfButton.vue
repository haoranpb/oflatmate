<template>
  <button
    class="w-full text-base font-medium inline-flex justify-center rounded-md border sm:w-auto sm:text-sm"
    :class="[focusClass, plainClass, primaryClass, warnClass, dangerClass]"
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
  },
  computed: {
    focusClass() {
      return [
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'focus:ring-indigo-500',
      ]
    },
    warnClass() {
      return this.warn
        ? ['text-red-600', 'border-gray-300', 'bg-white', 'hover:bg-gray-50']
        : []
    },
    dangerClass() {
      return this.danger
        ? ['border-transparent', 'bg-red-600', 'text-white', 'hover:bg-red-700']
        : []
    },
    plainClass() {
      return this.plain
        ? ['border-gray-300', 'bg-white', 'text-gray-700', 'hover:bg-gray-50']
        : []
    },
    primaryClass() {
      return this.primary
        ? [
            'border-transparent',
            'text-white',
            'bg-primary-600',
            'hover:bg-primary-700',
          ]
        : []
    },
  },
}
</script>
