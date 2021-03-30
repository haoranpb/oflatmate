<template>
  <div id="user" class="flex-col mx-20">
    <div class="flex flex-row w-full">
      <div class="w-80 pr-10">
        <h3 class="text-2xl font-bold ml-2 mb-4">Settings</h3>
        <router-link
          class="setting-link"
          v-for="item in settings"
          :to="item.route"
          :key="item.route"
        >
          <i :class="item.icon" class="mr-2 text-gray-500"></i>
          {{ item.title }}
        </router-link>
      </div>

      <router-view class="mt-12 w-1/2 mx-auto" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: [
        {
          route: 'profile',
          title: 'Profile',
          icon: 'far fa-id-card',
        },
        {
          route: 'notification',
          title: 'Notification',
          icon: 'fas fa-envelope-open-text',
        },
      ],
    }
  },
}
</script>

<style scoped>
.setting-link {
  @apply w-full h-10 leading-10 pl-4 text-lg font-medium text-gray-700 hover:bg-gray-100 inline-block rounded-lg;
}

.router-link-active {
  @apply bg-gray-200 !important;
}
</style>
