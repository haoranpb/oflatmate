<template>
  <router-link
    class="text-lg text-gray-400 font-medium hover:text-gray-500 leading-normal my-auto"
    to="/flat"
  >
    Flats
  </router-link>
  <the-profile />
</template>

<script>
import TheProfile from '@/components/headings/TheProfile.vue'

export default {
  components: { TheProfile },
}
</script>
