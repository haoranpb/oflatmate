<template>
  <div id="flat">
    <the-flat-track class="mb-4" />
    <the-chore-list />
  </div>
</template>

<script>
import TheFlatTrack from '@/components/singleton/TheFlatTrack.vue'
import TheChoreList from '@/components/singleton/TheChoreList.vue'

export default {
  components: { TheFlatTrack, TheChoreList },
  mounted() {
    this.$store.commit('fetchFlats')
  },
}
</script>
