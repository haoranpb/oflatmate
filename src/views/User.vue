<template>
  <div id="user" class="flex-col">
    <div v-if="user" class="flex flex-row w-full m-10 space-x-10">
      <img class="flex rounded-full w-18 h-18" :src="user.photoURL" />
      <div class="mt-4">
        <h2 class="text-2xl font-medium">{{ user.displayName }}</h2>
        <p class="text-gray-600">{{ user.email }}</p>
      </div>
    </div>
    <div>
      <h2 class="text-red-600 font-bold text-xl">Delete Account</h2>
      <p>Once you delete your account, there is no going back.</p>
      <button
        class="text-red-600 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
        @click="deleteAccount"
      >
        Delete Account
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
    }
  },
  mounted() {
    const self = this

    getCurrentUser(this.$firebase.auth())
      .then((user) => {
        self.user = user
      })
      .catch(() => {
        // Is there a better way to catch all this error?
        self.$router.push('/error')
      })
  },
  methods: {
    deleteAccount() {
      const self = this
      // TODO: To delete a user, the user must have signed in recently.
      // https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
      this.user
        .delete()
        .then(() => {
          self.$router.push('/authentication')
        })
        .catch(() => {
          self.$router.push('/authentication')
        })
    },
  },
}
</script>
