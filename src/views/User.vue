<template>
  <div id="user">
    <p>Welcome {{ user ? user.displayName : '' }}</p>
    <button @click="signOut">Sign Out</button>
    <button @click="deleteAccount">Delete Account</button>
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
    signOut() {
      this.$firebase.auth().signOut()
      this.$router.push('/authentication')
    },
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
