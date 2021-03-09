<template>
  <textarea
    class="textarea"
    autocomplete="off"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="{ 'textarea-solid': solid, 'textarea-simple': !solid }"
  ></textarea>
</template>

<script>
export default {
  props: {
    solid: {
      type: Boolean,
      default: false,
    },
    modelValue: String,
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>
.textarea {
  @apply block w-full rounded-md shadow-sm text-sm;
}

.textarea-simple {
  @apply border-gray-300 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50;
}

.textarea-solid {
  @apply bg-gray-100 border-transparent focus:border-primary-500 focus:bg-white focus:ring-0;
}
</style>
