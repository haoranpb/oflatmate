<template>
  <div v-if="user" class="ml-3 relative" ref="userMenu">
    <button
      class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      @click="open = !open"
    >
      <img class="h-8 w-8 rounded-full" :src="user.photoURL" />
    </button>
    <div
      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
      role="menu"
      v-show="open"
      @click="open = false"
    >
      <router-link
        to="/user"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        Your Profile
      </router-link>
      <button
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        role="menuitem"
        @click="signOut"
      >
        Sign out
      </button>
    </div>
  </div>
</template>

<script>
import { getCurrentUser } from '@/utils'

export default {
  data() {
    return {
      user: null,
      open: false,
    }
  },
  mounted() {
    document.addEventListener('click', this.closeMenu)
    const self = this
    // need to be refactored
    getCurrentUser(this.$firebase.auth()).then((user) => {
      self.user = user
    })
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeMenu)
  },
  methods: {
    closeMenu(e) {
      if (!this.$refs.userMenu.contains(e.target)) {
        this.open = false
      }
    },
    signOut() {
      this.$firebase.auth().signOut()
      this.$router.push('/authentication')
    },
  },
}
</script>
