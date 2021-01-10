<template>
  <div id="home">
    <the-heading class="flex container h-16 mx-auto items-center border-b">
      <component :is="currentComponent" />
    </the-heading>
    <router-view class="flex flex-grow container m-auto mt-2" />
  </div>
</template>

<script>
import TheHeading from '@/components/TheHeading.vue'
import HeadHome from '@/components/HeadHome.vue'
import HeadUser from '@/components/HeadUser.vue'

export default {
  components: { TheHeading },
  computed: {
    currentComponent() {
      return this.$route.name == 'home' ? HeadHome : HeadUser
    },
  },
}
</script>
