<template>
  <Field v-slot="{ field, errorMessage }">
    <label v-if="label" class="text-gray-700 mb-1 block">{{ label }}</label>
    <input
      v-bind="field"
      :disabled="disabled"
      :type="type"
      :placeholder="placeholder"
      class="input-solid"
      :class="[errorMessage ? 'input-danger' : 'mb-6']"
    />
    <span :class="{ 'text-red-500 h-5 text-xs': errorMessage }">
      {{ errorMessage }}
    </span>
  </Field>
</template>

<script>
import { Field } from 'vee-validate'

export default {
  components: { Field },
  props: {
    type: { type: String, default: 'text' },
    placeholder: { type: String },
    label: { type: String, default: null },
    disabled: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
input {
  @apply block text-sm w-full shadow-sm rounded-md;
}

.input-solid {
  @apply bg-gray-100 border-transparent focus:border-primary-500 focus:bg-white focus:ring-0;
}

.input-danger {
  @apply border-red-300 focus:border-red-500;
}

input:disabled {
  @apply cursor-not-allowed;
}
</style>
