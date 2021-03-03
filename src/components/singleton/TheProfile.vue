<template>
  <div v-if="$user" class="ml-3 relative" ref="userMenu">
    <button
      class="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      @click="open = !open"
    >
      <vf-avatar-item :link="$user.photoURL" />
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
import VfAvatarItem from '@/components/vf/VfAvatarItem.vue'

export default {
  data() {
    return {
      open: false,
    }
  },
  components: { VfAvatarItem },
  mounted() {
    document.addEventListener('click', this.closeMenu)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeMenu)
  },
  methods: {
    closeMenu(e) {
      // $refs.userMenu becomes `null` on click signOut
      if (this.$refs.userMenu && !this.$refs.userMenu.contains(e.target)) {
        this.open = false
      }
    },
    signOut() {
      this.$store.commit('clearUser')
      this.$auth.signOut()
      this.$router.push('/authentication')
    },
  },
}
</script>
