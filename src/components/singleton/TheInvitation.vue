<template>
  <div id="the-invitation" class="border m-px mb-6">
    <h3>Invite your flatmates to join the flat</h3>
    <vf-input v-model="email" placeholder="Add email" class="my-4" solid />
    <vf-button primary @click="invite" class="float-right mr-4 mt-2">
      Invite
    </vf-button>
  </div>
</template>

<script>
import VfButton from '@/components/vf/VfButton.vue'
import VfInput from '@/components/vf/VfInput.vue'

export default {
  components: { VfInput, VfButton },
  data() {
    return {
      email: '',
    }
  },
  methods: {
    invite() {
      this.$func('inviteToFlat', {
        email: this.email,
        flatName: this.$store.getters.currentFlat.name,
        flatId: this.$store.state.currentFlatId,
      })

      this.email = ''
    },
  },
}
</script>
