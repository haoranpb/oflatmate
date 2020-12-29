<template>
  <div id="user">
    <p>Welcome {{ username }}</p>
  </div>
</template>

<script>
// TODO: expressjs redirect
export default {
  data() {
    return {
      username: '',
    }
  },
  mounted() {
    const self = this

    this.$http
      .get('/user/info')
      .then((response) => {
        self.username = response.data.username
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
