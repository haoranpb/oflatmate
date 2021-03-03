<template>
  <div
    id="layout"
    class="flex flex-col"
    :class="[$route.name == 'home' ? 'h-auto' : 'h-full']"
  >
    <the-heading class="flex container h-16 mx-auto items-center">
      <component :is="currentComponent" />
    </the-heading>
    <main class="flex flex-grow container mx-auto mt-2">
      <router-view class="flex flex-col container" />
    </main>
  </div>
</template>

<script>
import TheHeading from '@/components/singleton/TheHeading.vue'
import HeadHome from '@/components/HeadHome.vue'
import HeadUser from '@/components/HeadUser.vue'
import HeadFlat from '@/components/HeadFlat.vue'

export default {
  components: { TheHeading },
  computed: {
    currentComponent() {
      switch (this.$route.name) {
        case 'home':
          return HeadHome
        case 'user':
          return HeadUser
        case 'flat':
          return HeadFlat
        default:
          return HeadHome
      }
    },
  },
}
</script>
