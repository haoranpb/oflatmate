<template>
  <div class="flex flex-col h-screen bg-white">
    <the-heading class="h-16 container mx-auto flex items-center border-b" />
    <router-view class="flex flex-grow container m-auto mt-2" />
  </div>
  <router-view />
</template>

<script>
import TheHeading from '@/components/TheHeading.vue'

export default {
  components: { TheHeading },
}
</script>
