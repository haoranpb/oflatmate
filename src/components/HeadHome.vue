<template>
  <h2 class="text-lg text-gray-400 font-medium hover:text-gray-500">
    <router-link to="/authentication">Sign In/Up</router-link>
  </h2>
  <outbound-link href="https://github.com/ludanxer/flatmate">
    <i class="fab fa-github fa-lg text-gray-400 hover:text-gray-500"></i>
  </outbound-link>
</template>

<script>
import OutboundLink from '@/components/OutboundLink.vue'

export default {
  components: { OutboundLink },
}
</script>
