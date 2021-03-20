<template>
  <vf-modal-base v-if="showModal" :warning="options.type == 'warning'">
    <template #title>
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        {{ options.title }}
      </h3>
    </template>
    <template #icon>
      <i
        class="fas"
        :class="[
          options.type == 'warning' ? 'text-red-500' : 'text-primary-500',
          options.icon,
        ]"
      ></i>
    </template>
    <template #content>
      <p class="text-sm text-gray-500" v-if="options.content">
        {{ options.content }}
      </p>
      <vf-input
        solid
        class="mt-3 w-5/6"
        v-if="options.type == 'dialog'"
        v-model="inputText"
        :placeholder="options.dialog.placeholder"
        :status="input.status"
        :message="input.message"
        @keypress="clearDanger"
      />
    </template>
    <template #action>
      <vf-button large danger @click="actionCallback" class="sm:ml-3">
        {{ options.action.title }}
      </vf-button>
    </template>
    <template #close>
      <vf-button simple large @click="closeModal" class="sm:ml-3">
        Cancel
      </vf-button>
    </template>
  </vf-modal-base>
</template>

<script>
import VfModalBase from './VfModalBase.vue'
import { validateInput } from './utils.js'

export default {
  data() {
    return {
      showModal: false,
      options: null,
      inputText: '',
      input: {
        status: null,
        message: null,
      },
    }
  },
  components: { VfModalBase },
  methods: {
    handleModalOpen(e) {
      this.options = e.detail
      this.showModal = true
    },
    actionCallback() {
      if (this.options.type == 'dialog') {
        const validResult = validateInput(
          this.inputText,
          this.options.dialog.validation
        )
        if (validResult.error) {
          this.input.status = 'danger'
          this.input.message = validResult.message
        } else {
          this.options.action.callback(validResult)
          this.inputText = ''
          this.showModal = false
        }
      } else {
        this.options.action.callback()
        this.showModal = false
      }
    },
    clearDanger() {
      this.input.status = null
      this.input.message = null
    },
    closeModal() {
      this.showModal = false
      this.clearDanger()
    },
  },
  mounted() {
    document.addEventListener('vfModal:open', this.handleModalOpen)
  },
  beforeUnmount() {
    document.removeEventListener('vfModal:open', this.handleModalOpen)
  },
}
</script>
