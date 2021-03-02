<template>
  <div id="user" class="flex-col">
    <vf-modal v-if="deletePop" warn>
      <template #title>Deactivate account</template>
      <template #description>
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </template>
      <template #icon>
        <svg
          class="h-6 w-6 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
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
import VfButton from '@/components/vf/VfButton.vue'
import VfModal from '@/components/vf/VfModal.vue'
import VfAvatarItem from '@/components/vf/VfAvatarItem.vue'

export default {
  data() {
    return {
      deletePop: false,
    }
  },
  components: { VfButton, VfAvatarItem, VfModal },
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
