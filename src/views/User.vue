<template>
  <div id="user" class="flex-col">
    <div v-if="$user" class="flex flex-row w-full m-10 space-x-10">
      <img class="flex rounded-full w-18 h-18" :src="$user.photoURL" />
      <div class="mt-4">
        <h2 class="text-2xl font-medium">{{ $user.displayName }}</h2>
        <p class="text-gray-600">{{ $user.email }}</p>
      </div>
    </div>
    <div>
      <h2 class="text-red-600 font-bold text-xl">Delete Account</h2>
      <p>Once you delete your account, there is no going back.</p>
      <f-button
        class="text-red-600 border-gray-300 px-4 py-2 bg-white text-base font-medium hover:bg-gray-50 sm:w-auto sm:text-sm"
        @click="deletePop = true"
        >Delete your account</f-button
      >
    </div>
    <warn-pop v-if="deletePop">
      <template v-slot:title>Deactivate account</template>
      <template v-slot:description>
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </template>
      <template v-slot:action>
        <f-button
          @click="conformDelete"
          class="w-full border-transparent px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
          >Deactivate
        </f-button>
      </template>
      <template v-slot:close>
        <f-button
          @click="deletePop = false"
          class="mt-3 w-full border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >Cancel
        </f-button>
      </template>
    </warn-pop>
  </div>
</template>

<script>
import FButton from '@/components/FButton.vue'
import WarnPop from '@/components/WarnPop.vue'

export default {
  data() {
    return {
      deletePop: false,
    }
  },
  components: { FButton, WarnPop },
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
