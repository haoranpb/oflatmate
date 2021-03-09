<template>
  <router-link
    class="text-lg text-gray-400 font-medium hover:text-gray-500 leading-normal my-auto px-3 py-1"
    to="/flat"
  >
    Flats
  </router-link>
  <head-profile />
</template>

<script>
import HeadProfile from '@/components/headings/HeadProfile.vue'

export default {
  components: { HeadProfile },
}
</script>
