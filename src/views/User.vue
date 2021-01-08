<template>
  <div id="user">
    <p>Welcome {{ user.displayName }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    }
  },
  mounted() {
    const self = this

    this.$firebase.auth().onAuthStateChanged((user) => {
      self.user = user
    })
  },
}
</script>
