<template>
  <vf-modal-base v-if="modelValue">
    <vf-form @submit="submit">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 bg-primary-100"
          >
            <i :class="['text-primary-500', icon]"></i>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <slot name="title"></slot>
            <div class="mt-2">
              <slot name="content"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <slot name="action"></slot>
        <vf-button
          large
          simple
          type="reset"
          class="sm:mr-3"
          @click="closeModal"
        >
          Cancel
        </vf-button>
      </div>
    </vf-form>
  </vf-modal-base>
</template>

<script>
import VfModalBase from './VfModalBase.vue'

export default {
  props: {
    icon: { type: String, required: true },
    onSubmit: { type: Function, required: true },
    modelValue: { type: Boolean, default: false },
  },
  components: { VfModalBase },
  emits: ['update:modelValue'],
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false)
    },
    submit(values) {
      this.onSubmit(values)
      this.closeModal()
    },
  },
}
</script>
