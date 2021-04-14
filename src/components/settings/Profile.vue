<template>
  <div>
    <h2 class="text-2xl mb-4">Profile</h2>

    <vf-form @submit="onSubmit" :validation-schema="profileSchema">
      <vf-input
        name="username"
        label="Username"
        :placeholder="$user.displayName"
      />
      <vf-input
        disabled
        type="email"
        name="email"
        label="Email address"
        :placeholder="$user.email"
      />
      <div class="flex flex-row space-x-2 pt-2">
        <div class="flex-grow"></div>
        <vf-button type="reset">Reset</vf-button>
        <vf-button primary>Save</vf-button>
      </div>
    </vf-form>

    <div class="mt-4">
      <h3 class="text-red-600 font-bold text-xl">Delete Account</h3>
      <p>Once you delete your account, there is no going back.</p>
      <vf-button class="mt-1" large warn @click="deleteModal = true">
        Delete your account
      </vf-button>
    </div>

    <vf-modal
      warning
      v-model="deleteModal"
      title="Deactivate account"
      icon="fas fa-exclamation-triangle"
    >
      <template #content>
        <p class="text-sm text-gray-500">
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>
      </template>
      <template #action>
        <vf-button large danger @click="handleDelete">Deactivate</vf-button>
      </template>
    </vf-modal>
  </div>
</template>

<script>
import { object, string } from 'yup'
import { ref } from 'vue'

export default {
  setup() {
    const profileSchema = object({
      username: string().required().trim().max(25),
    })
    const deleteModal = ref(false)

    return {
      profileSchema,
      deleteModal,
    }
  },
  methods: {
    onSubmit(values, { resetForm }) {
      this.$user
        .updateProfile({
          displayName: values.username,
        })
        .then(() => {
          resetForm()
        })
    },
    handleDelete() {
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
}
</script>
