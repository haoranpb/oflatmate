<template>
  <div
    id="home"
    class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
  >
    <section class="sm:text-center lg:text-left">
      <h1
        class="text-5xl tracking-tight font-extrabold text-gray-900 md:text-6xl"
      >
        <span class="block xl:inline xl:mr-2">Open</span>
        <span class="block text-primary-600 xl:inline">Flatmate</span>
      </h1>
      <p
        class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
      >
        Flat sharing made easier with open source solution
      </p>
      <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
        <div class="rounded-md shadow">
          <router-link
            to="/authentication"
            class="hero-link text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
          >
            Get started
          </router-link>
        </div>
        <div class="mt-3 sm:mt-0 sm:ml-3">
          <router-link
            to="#"
            class="hero-link text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
          >
            Documentation
          </router-link>
        </div>
      </div>
    </section>

    <section class="text-gray-600 container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        <feature-item
          v-for="item in features"
          :key="item.icon"
          :outLink="item.outLink"
        >
          <template #icon><i class="fas" :class="item.icon"></i></template>
          <template #title>{{ item.title }}</template>
          <template #description>{{ item.description }}</template>
          <template #link>{{ item.link }}</template>
        </feature-item>
      </div>
    </section>
  </div>
</template>

<script>
import FeatureItem from '@/components/FeatureItem.vue'

export default {
  components: { FeatureItem },
  data() {
    return {
      features: [
        {
          title: 'Open Source',
          description: 'Flatmate is completely open sourced with MIT license',
          icon: 'fa-code-branch',
          link: 'Source Code',
          outLink: 'https://github.com/ludanxer/flatmate',
        },
        {
          title: 'Public Roadmap',
          description:
            'Flatmate iterates fast and the next steps are always available in public, \
            feel free to drop your opions on our plan so we can learn what you think about and \
            move towards the right direction',
          icon: 'fa-map',
          link: 'Roadmap',
          outLink: 'https://github.com/ludanxer/flatmate/projects',
        },
        {
          title: 'Community Driven',
          description:
            'Flatmate will never move to a paid model, and we plan to survive base on your donation. \
            There are mayn ways to keep Flatmate alive, e.g. give your feedbacks on our website, \
            check out the link below for more',
          icon: 'fa-coins',
          link: 'Help us improve',
          outLink: 'https://github.com/ludanxer/flatmate',
        },
      ],
    }
  },
}
</script>

<style scoped>
.hero-link {
  @apply w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md;
}
</style>
