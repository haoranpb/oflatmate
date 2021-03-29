<template>
  <div v-if="users" class="flex -space-x-2 overflow-hidden">
    <tippy
      :allowHTML="true"
      theme="light"
      placement="top-start"
      v-for="member in users"
      :key="member.uid"
    >
      <vf-avatar-item :link="member.photoURL" />

      <template #content>
        <div class="flex flex-row space-x-2">
          <vf-avatar-item :link="member.photoURL" />
          <div class="flex flex-col">
            <h3 class="font-medium">{{ member.displayName }}</h3>
            <h4 class="text-gray-500">{{ member.email || 'Deleted User' }}</h4>
          </div>
        </div>
      </template>
    </tippy>
  </div>
</template>

<script>
import VfAvatarItem from './VfAvatarItem.vue'
import { Tippy } from 'vue-tippy'

export default {
  data() {
    return {
      users: null,
    }
  },
  components: { VfAvatarItem, Tippy },
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
