<template>
  <div id="the-heading">
    <h1 class="text-2xl font-medium pl-8 inline-block">
      <router-link to="/">Flatmate</router-link>
    </h1>
    <div class="flex-grow"></div>
    <!-- TODO: seperate into a dedicate component with responsive design -->
    <div class="flex space-x-6">
      <h2 class="text-lg text-gray-400 font-medium hover:text-gray-500">
        <router-link to="/authentication">Sign In/Up</router-link>
        <!-- active status: text-gray-600 -->
      </h2>
      <outbound-link href="https://github.com/ludanxer/flatmate">
        <i class="fab fa-github fa-lg text-gray-400 hover:text-gray-500"></i>
      </outbound-link>
    </div>
  </div>
</template>

<script>
import OutboundLink from '@/components/OutboundLink.vue'

export default {
  components: { OutboundLink },
}
</script>
