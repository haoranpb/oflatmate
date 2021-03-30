<template>
  <div>
    <h2 class="text-2xl mb-4">Profile</h2>

    <form autocomplete="off">
      <label class="block">
        <span class="text-gray-700 mb-1 block">Display name</span>
        <vf-input
          solid
          :placeholder="$user.displayName"
          v-model="username.content"
          :status="username.status"
          :message="username.message"
          @keypress="clearDanger"
        />
      </label>
      <label class="block">
        <span class="text-gray-700 mb-1 block">Email address</span>
        <vf-input
          solid
          disabled
          type="email"
          v-model="email"
          :placeholder="$user.email"
        />
      </label>
      <div class="flex flex-row space-x-2 pt-2">
        <div class="flex-grow"></div>
        <!-- type="reset" does not clear binding -->
        <vf-button type="button" @click="clearInput">Cancel</vf-button>
        <!-- not sure how to custimize the submit action -->
        <vf-button type="button" primary @click="updateProfile">Save</vf-button>
      </div>
    </form>

    <div class="mt-4">
      <h3 class="text-red-600 font-bold text-xl">Delete Account</h3>
      <p>Once you delete your account, there is no going back.</p>
      <vf-button class="mt-1" large warn @click="handleDelete">
        Delete your account
      </vf-button>
    </div>
  </div>
</template>

<script>
import { validateInput } from '@oflatmate/utils'

export default {
  data() {
    return {
      email: '',
      username: {
        content: '',
        status: null,
        message: null,
      },
    }
  },
  methods: {
    clearInput() {
      this.username.content = ''
    },
    clearDanger() {
      this.username.status = null
      this.username.message = null
    },
    updateProfile() {
      const validResult = validateInput(this.username.content, { length: 25 })

      if (validResult.error) {
        this.username.status = 'danger'
        this.username.message = validResult.message
      } else {
        this.$user
          .updateProfile({
            displayName: this.username.content,
          })
          .then(() => {
            this.clearInput()
          })
      }
    },
    handleDelete() {
      this.$vfModal({
        title: 'Deactivate account',
        icon: 'fa-exclamation-triangle',
        type: 'warning',
        content:
          'Are you sure you want to deactivate your account? All of your data \
          will be permanently removed. This action cannot be undone.',
        action: {
          title: 'Deactivate',
          callback: () => {
            this.$user
              .delete()
              .then(() => {
                this.$store.commit('clearUser')
                this.$router.push('/authentication')
              })
              .catch(() => {
                // TODO: To delete a user, the user must have signed in recently.
                // https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
              })
          },
        },
      })
    },
  },
}
</script>
