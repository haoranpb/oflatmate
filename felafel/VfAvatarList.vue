<template>
  <div v-if="users" class="flex -space-x-2 overflow-hidden">
    <vf-avatar-item
      v-for="member in users"
      :key="member.uid"
      :link="member.photoURL"
    />
    <vf-avatar-item v-if="plus" :plus="plus" @click="$emit('clickPlus')" />
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
    plus: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['clickPlus'],
  mounted() {
    // cache user info in vuex
    this.$func('getUsersInfo', this.members).then((result) => {
      this.users = result.data.users
    })
  },
}
</script>
