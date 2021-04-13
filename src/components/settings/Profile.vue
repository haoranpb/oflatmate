<template>
  <div>
    <h2 class="text-2xl mb-4">Profile</h2>

    <vf-form @submit="onSubmit" :validation-schema="profileSchema">
      <vf-input
        name="username"
        :placeholder="$user.displayName"
        label="Username"
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
      <vf-button class="mt-1" large warn @click="handleDelete">
        Delete your account
      </vf-button>
    </div>
  </div>
</template>

<script>
import { object, string } from 'yup'

export default {
  setup() {
    // not reactive, no overhead
    const profileSchema = object({
      username: string().required().trim().max(25),
    })

    return {
      profileSchema,
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
