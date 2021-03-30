<template>
  <div :class="{ 'pb-5': status != 'danger' }">
    <input
      class="input"
      :type="type"
      :disabled="disabled"
      autocomplete="off"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :class="{
        'input-solid': solid,
        'input-simple': !solid,
        'input-danger': status == 'danger',
        'cursor-not-allowed': disabled,
      }"
    />
    <p
      v-show="status"
      class="text-xs text-red-500 pt-1 h-5"
      :class="[status == 'danger' ? 'text-red-500' : 'text-primary-500']"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    solid: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
    disabled: { type: Boolean, default: false },
    status: { type: String },
    message: { type: String },
    placeholder: { type: String },
    modelValue: String,
  },
  emits: ['update:modelValue'],
}
</script>

<style scoped>
.input {
  @apply block text-sm w-full shadow-sm rounded-md;
}

.input-solid {
  @apply bg-gray-100 border-transparent focus:border-primary-500 focus:bg-white focus:ring-0;
}

.input-simple {
  @apply border-gray-300 focus:border-primary-500 focus:ring-primary-500;
}

.input-danger {
  @apply border-red-300 focus:border-red-500;
}
</style>
