<template>
  <div class="flex flex-col h-screen bg-white">
    <div class="bg-red-300 h-6 text-center">
      <p>Flatmate is still in development</p>
    </div>
    <the-heading class="flex container h-16 mx-auto items-center border-b" />
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
