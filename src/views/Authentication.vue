<template>
  <div id="authentication">
    <section class="text-gray-600">
      <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 class="font-medium text-3xl text-gray-900">
            Welcome to Flatmate
          </h1>
          <p class="leading-relaxed mt-4">
            A platform driven by community to make flat sharing easier
          </p>
        </div>
        <div
          class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
        >
          <div id="firebaseui-auth-container"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { DEFAULT_SIGNIN_PATH } from '@/utils'
import { firebase } from '@/firebaseConfig'

export default {
  mounted() {
    const ui = new firebaseui.auth.AuthUI(this.$auth)

    const nextPath = this.$route.redirectedFrom
      ? this.$route.redirectedFrom.fullPath
      : DEFAULT_SIGNIN_PATH

    ui.start('#firebaseui-auth-container', {
      // no auto refresh during login, but getCurrentUser in utils is still needed for user refresh
      signInFlow: 'popup',
      signInSuccessUrl: nextPath,
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    })
  },
}
</script>
