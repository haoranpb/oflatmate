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
      <button @click="deleteAccount">Delete Account</button>
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
