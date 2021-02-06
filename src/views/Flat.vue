<template>
  <div id="flat">
    <the-flat-track class="mb-4" />
    <div class="flex flex-row space-x-4 flex-grow">
      <the-chore-list class="base-box" />
      <div>
        <the-invitation class="base-box" />
        <the-announcement class="base-box" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TheFlatTrack from '@/components/singleton/TheFlatTrack.vue'
import TheChoreList from '@/components/singleton/TheChoreList.vue'
import TheInvitation from '@/components/singleton/TheInvitation.vue'

export default {
  components: { TheFlatTrack, TheChoreList, TheInvitation },
  mounted() {
    this.fetchFlats()

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
    ...mapMutations(['fetchFlats', 'setCurrentFlatId', 'appendFlat']),
  },
}
</script>

<style>
.empty-box {
  @apply border-dashed border-2 border-gray-300;
}

.base-box {
  @apply rounded-md p-6 w-80 h-48;
}
</style>
