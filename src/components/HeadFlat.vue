<template>
  <the-invitation />
  <the-profile />
</template>


<script>
import TheProfile from '@/components/singleton/TheProfile.vue'
import TheInvitation from '@/components/singleton/TheInvitation.vue'

export default {
  components: { TheProfile, TheInvitation },
}
</script>
