<template>
  <div
    id="layout"
    class="flex flex-col"
    :class="[$route.name == 'home' ? 'h-auto' : 'h-full']"
  >
    <the-heading class="flex container h-16 mx-auto items-center">
      <component :is="currentComponent" />
      <head-profile v-if="$route.name != 'home'" />
    </the-heading>
    <main class="flex flex-grow container mx-auto mt-2">
      <router-view class="flex flex-col container" />
    </main>
  </div>
</template>

<script>
import TheHeading from '@/components/headings/TheHeading.vue'
import HeadProfile from '@/components/headings/HeadItemProfile.vue'
import HeadHome from '@/components/headings/HeadHome.vue'
import HeadUser from '@/components/headings/HeadUser.vue'
import HeadFlat from '@/components/headings/HeadFlat.vue'

export default {
  components: { TheHeading, HeadProfile },
  computed: {
    currentComponent() {
      switch (this.$route.name) {
        case 'home':
          return HeadHome
        case 'flat':
          return HeadFlat
        default:
          return HeadUser
      }
    },
  },
}
</script>
