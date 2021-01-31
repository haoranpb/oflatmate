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
      <vf-button warn class="px-4 py-2" @click="deletePop = true">
        Delete your account
      </vf-button>
    </div>
    <warn-pop v-if="deletePop">
      <template #title>Deactivate account</template>
      <template #description>
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </template>
      <template #action>
        <vf-button danger @click="conformDelete" class="px-4 py-2 sm:ml-3">
          Deactivate
        </vf-button>
      </template>
      <template #close>
        <vf-button plain @click="deletePop = false" class="px-4 py-2 sm:ml-3">
          Cancel
        </vf-button>
      </template>
    </warn-pop>
  </div>
</template>

<script>
import VfButton from '@/components/vf/VfButton.vue'
import WarnPop from '@/components/WarnPop.vue'
import VfAvatarItem from '@/components/vf/VfAvatarItem.vue'

export default {
  data() {
    return {
      deletePop: false,
    }
  },
  components: { VfButton, WarnPop, VfAvatarItem },
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
