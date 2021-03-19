<template>
  <div id="flat">
    <the-flat-track class="mb-4" />
    <div
      v-if="$store.state.flat.currentFlatId"
      class="flex flex-row space-x-4 flex-grow"
    >
      <the-chore-list class="base-box" />
    </div>
    <div v-else>You don't have a flat yet, create one Now!</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TheFlatTrack from '@/components/singleton/TheFlatTrack.vue'
import TheChoreList from '@/components/singleton/TheChoreList.vue'

export default {
  components: { TheFlatTrack, TheChoreList },
  mounted() {
    this.$store.dispatch('fetchFlats')

    // handles invitation
    if (Object.keys(this.$route.query).length != 0) {
      const invitetId = this.$route.query.invite
      const flatId = this.$route.query.flat

      if (this.$store.getters.existFlat(flatId)) {
        this.setCurrentFlatId(invitetId)
      } else {
        this.$func('handleInvitation', {
          inviteId: invitetId,
        }).then((result) => {
          this.appendFlat(Object.assign({ id: flatId }, result.data))
        })
      }
    }
  },
  methods: {
    ...mapMutations(['setCurrentFlatId', 'appendFlat']),
  },
}
</script>

<style scoped>
.base-box {
  @apply rounded-md p-6 w-80;
}
</style>
