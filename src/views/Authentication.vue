<template>
  <div id="authentication">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  mounted() {
    const ui = new firebaseui.auth.AuthUI(this.$firebase.auth())

    const nextPath = this.$route.redirectedFrom
      ? this.$route.redirectedFrom.path
      : '/user'

    ui.start('#firebaseui-auth-container', {
      // no auto refresh during login, but getCurrentUser in utils is still needed for user refresh
      signInFlow: 'popup',
      signInSuccessUrl: nextPath,
      signInOptions: [
        this.$firebase.auth.EmailAuthProvider.PROVIDER_ID,
        this.$firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    })
  },
}
</script>
