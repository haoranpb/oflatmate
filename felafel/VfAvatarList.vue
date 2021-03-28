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
import VfAvatarItem from './VfAvatarItem.vue'

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
  methods: {
    // TODO: pass as a prop to de-couple from src
    getUserDetail() {
      // cache user info in vuex
      this.$func('getUsersInfo', this.members).then((result) => {
        this.users = result.data.users.concat(result.data.notFound)
      })
    },
  },
  mounted() {
    this.getUserDetail()
  },
  watch: {
    members() {
      this.getUserDetail()
    },
  },
}
</script>
