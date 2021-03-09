<template>
  <div id="the-announcement" class="empty-box">
    <p class="text-gray-500">No announcement has been created</p>
    <vf-textarea
      v-model="message"
      placeholder="Say hello to your flatmates 👋"
      class="my-4"
      solid
    />
    <vf-button primary class="float-right mr-4">Post</vf-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    }
  },
}
</script>
