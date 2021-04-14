<template>
  <vf-modal-base v-if="modelValue">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div
          class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
          :class="[warning ? 'bg-red-100' : 'bg-primary-100']"
        >
          <i :class="[warning ? 'text-red-500' : 'text-primary-500', icon]"></i>
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ title }}
          </h3>
          <div class="mt-2">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      <slot name="action"></slot>
      <vf-button simple large @click="closeModal" class="sm:mr-3">
        Cancel
      </vf-button>
    </div>
  </vf-modal-base>
</template>

<script>
import VfModalBase from './VfModalBase.vue'

export default {
  props: {
    warning: { type: Boolean, default: false },
    icon: { type: String, required: true },
    title: { type: String, required: true },
    modelValue: { type: Boolean, default: false },
  },
  components: { VfModalBase },
  emits: ['update:modelValue'],
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false)
    },
  },
}
</script>
