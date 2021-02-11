<template>
  <div id="the-invitation" class="border m-px mb-6">
    <h3>Invite your flatmates to join the flat</h3>
    <vf-input
      solid
      class="my-3"
      v-model="email"
      placeholder="Add email"
      :status="input.status"
      :message="input.message"
      @keypress="clearDanger"
    />
    <vf-button primary @click="invite" class="float-right mr-4 mt-2">
      Invite
    </vf-button>
  </div>
</template>

<script>
import { validateInput } from '@/utils'
import VfButton from '@/components/vf/VfButton.vue'
import VfInput from '@/components/vf/VfInput.vue'

export default {
  components: { VfInput, VfButton },
  data() {
    return {
      email: '',
      input: {
        status: null,
        message: null,
      },
    }
  },
  methods: {
    invite() {
      const result = validateInput(this.email, { email: true })

      if (result.error) {
        this.input.status = 'danger'
        this.input.message = result.message
      } else {
        this.$func('inviteToFlat', {
          email: result.data,
          flatName: this.$store.getters.currentFlat.name,
          flatId: this.$store.state.currentFlatId,
        })
      }

      this.email = ''
    },
    clearDanger() {
      this.input.status = null
      this.input.message = null
    },
  },
}
</script>
