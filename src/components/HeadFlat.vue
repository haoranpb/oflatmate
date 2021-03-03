<template>
  <vf-button title="invite" plain class="text-gray-500" @click="invite">
    <i class="fas fa-user-friends my-auto"></i>
    <span class="text-lg ml-1">Invite</span>
  </vf-button>
  <the-profile />
</template>


<script>
import TheProfile from '@/components/singleton/TheProfile.vue'
import VfButton from '@/components/vf/VfButton.vue'

export default {
  components: { TheProfile, VfButton },
  methods: {
    invite() {
      console.log('inite')
    },
  },
}
</script>
