<template>
  <div v-if="users" class="flex -space-x-2 overflow-hidden">
    <vf-avatar-item
      v-for="member in users"
      :key="member.uid"
      :link="member.photoURL"
    />
  </div>
</template>

<script>
import VfAvatarItem from '@/components/vf/VfAvatarItem.vue'

export default {
  data() {
    return {
      users: null,
    }
  },
  components: { VfAvatarItem },
  props: {
    members: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.$func
      .httpsCallable('getUsersInfo')(this.members)
      .then((result) => {
        this.users = result.data.users
      })
  },
}
</script>
