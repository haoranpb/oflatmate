<template>
  <div id="flat">
    <the-flat-track class="mb-4" />
    <div class="flex flex-row space-x-4">
      <the-chore-list />
      <the-invitation />
    </div>
  </div>
</template>

<script>
import TheFlatTrack from '@/components/singleton/TheFlatTrack.vue'
import TheChoreList from '@/components/singleton/TheChoreList.vue'
import TheInvitation from '@/components/singleton/TheInvitation.vue'

export default {
  components: { TheFlatTrack, TheChoreList, TheInvitation },
  mounted() {
    this.$store.commit('fetchFlats')

    // handles invitation
    if (Object.keys(this.$route.query).length != 0) {
      const invitetId = this.$route.query.invite
      const flatId = this.$route.query.flat

      if (this.$store.state.flats.find((flat) => flat.id == flatId)) {
        this.$store.commit('setCurrentFlatId', invitetId)
      } else {
        this.$func('handleInvitation', {
          inviteId: invitetId,
        }).then((result) => {
          this.$store.commit(
            'appendFlat',
            Object.assign({ id: flatId }, result.data)
          )
        })
      }
    }
  },
}
</script>
