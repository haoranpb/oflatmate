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

    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: '/user',
      signInOptions: [
        this.$firebase.auth.EmailAuthProvider.PROVIDER_ID,
        this.$firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    })
  },
}
</script>
