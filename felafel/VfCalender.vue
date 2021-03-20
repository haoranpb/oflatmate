<template>
  <input
    id="cal"
    type="date"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="h-6 w-28 border-none rounded-md bg-gray-100"
  />
</template>

<script>
// Consider moving to native input[type=date],
// Safari doesn't have support
import flatPickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'

export default {
  mounted() {
    flatPickr('#cal', {
      defaultDate: new Date(),
    })
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
}
</script>
