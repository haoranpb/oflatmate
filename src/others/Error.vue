<template>
  <div id="error" class="m-auto mt-24 w-2/3 font-medium">
    <h2 class="text-3xl mb-4">Error</h2>
    <p>
      Sorry, it apears that there is something wrong, please come back later.
    </p>
    <p>
      <outbound-link
        href="https://github.com/ludanxer/flatmate/issues/new"
        class="text-primary-600"
        >Create an issue</outbound-link
      >
      to tell us what is happening and help us improve flatmate!
    </p>
  </div>
</template>

<script>
import OutboundLink from '@/components/OutboundLink.vue'

export default {
  components: { OutboundLink },
}
</script>
