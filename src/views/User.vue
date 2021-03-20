<template>
  <div id="user" class="flex-col">
    <div v-if="$user" class="flex flex-row w-full m-10 space-x-10">
      <vf-avatar-item large :link="$user.photoURL" />
      <div class="mt-4">
        <h2 class="text-2xl font-medium">{{ $user.displayName }}</h2>
        <p class="text-gray-600">{{ $user.email }}</p>
      </div>
    </div>
    <div>
      <h2 class="text-red-600 font-bold text-xl">Delete Account</h2>
      <p>Once you delete your account, there is no going back.</p>
      <vf-button large warn @click="handleDelete">
        Delete your account
      </vf-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
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
