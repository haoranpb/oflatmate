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

      <div v-if="proviedByPass">
        <span class="text-gray-700">Password</span>
        <vf-button type="button" solid large class="ml-4" @click="pwdReset">
          Reset your Password by email
        </vf-button>
      </div>
      <vf-input v-else type="password" name="password" label="Password" />

      <div class="mt-8 flex flex-row space-x-2 pt-2">
        <div class="flex-grow"></div>
        <vf-button large type="reset">Reset</vf-button>
        <vf-button large primary>Save</vf-button>
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
import yuppass from 'yup-password'
import * as yup from 'yup'
import { ref } from 'vue'
import { authProviders } from '@/firebaseConfig'

export default {
  setup() {
    yuppass(yup)

    const profileSchema = yup.object({
      username: yup.string().required().trim().max(25),
      password: yup.string().password(),
    })
    const deleteModal = ref(false)

    return {
      profileSchema,
      deleteModal,
    }
  },
  methods: {
    onSubmit(values, { resetForm }) {
      if (values.password) {
        const credential = authProviders.Email.credential(
          this.$user.email,
          values.password
        )
        this.$auth.currentUser
          .linkWithCredential(credential)
          .then((usercred) => {
            this.$store.commit('setUser', usercred.user)
            resetForm()
          })
      }

      this.$auth.currentUser
        .updateProfile({
          displayName: values.username,
        })
        .then(() => {
          this.$store.commit('setUser', this.$auth.currentUser)
          resetForm()
        })
    },
    handleDelete() {
      this.$auth.currentUser
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
    pwdReset() {
      this.$auth.sendPasswordResetEmail(this.$user.email).then(() => {
        alert('Email sent')
      })
    },
  },
  computed: {
    proviedByPass() {
      return (
        this.$user.providerData.find(
          (provider) => provider.providerId == authProviders.Email.PROVIDER_ID
        ) != undefined
      )
    },
  },
}
</script>
