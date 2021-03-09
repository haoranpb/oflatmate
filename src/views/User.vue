<template>
  <div id="user" class="flex-col">
    <vf-modal v-if="deletePop" warn>
      <template #title>Deactivate account</template>
      <template #content>
        <p class="text-sm text-gray-500">
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>
      </template>
      <template #action>
        <vf-button large danger @click="conformDelete" class="sm:ml-3">
          Deactivate
        </vf-button>
      </template>
      <template #close>
        <vf-button simple large @click="deletePop = false" class="sm:ml-3">
          Cancel
        </vf-button>
      </template>
    </vf-modal>

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
      <vf-button large warn @click="deletePop = true">
        Delete your account
      </vf-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deletePop: false,
    }
  },
  methods: {
    conformDelete() {
      this.$user
        .delete()
        .then(() => {
          this.$user = null
          this.$router.push('/authentication')
        })
        .catch(() => {
          // TODO: To delete a user, the user must have signed in recently.
          // https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
        })
    },
  },
}
</script>
