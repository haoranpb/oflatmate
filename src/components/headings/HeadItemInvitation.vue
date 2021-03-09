<template>
  <vf-button
    plain
    title="Invite your flatmates"
    class="text-gray-500"
    @click="showInvite = true"
  >
    <i class="fas fa-user-friends my-auto"></i>
    <span class="text-lg ml-2">Invite</span>
  </vf-button>

  <vf-modal v-if="showInvite">
    <template #title>
      Invite your flatmates to join
      <span class="text-primary-600 font-medium">{{
        $store.getters.currentFlat.name
      }}</span>
    </template>
    <template #icon>
      <i class="fas fa-user-plus text-primary-500"></i>
    </template>
    <template #content>
      <vf-input
        solid
        class="mt-3 w-5/6"
        v-model="email"
        placeholder="Add email"
        :status="input.status"
        :message="input.message"
        @keypress="clearDanger"
      />
    </template>
    <template #action>
      <vf-button large primary @click="invite" class="sm:ml-3">
        Invite
      </vf-button>
    </template>
    <template #close>
      <vf-button simple large @click="showInvite = false" class="sm:ml-3">
        Cancel
      </vf-button>
    </template>
  </vf-modal>
</template>

<script>
import { validateInput } from '@/utils'

export default {
  data() {
    return {
      showInvite: false,
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
        }).then(() => {
          this.input.status = 'primay'
          this.input.message = 'Invitation sent'
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
