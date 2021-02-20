<template>
  <div class="p-4 md:w-1/3">
    <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
      <div class="flex items-center mb-3">
        <div
          class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-primary-500 text-white flex-shrink-0"
        >
          <slot name="icon"></slot>
        </div>
        <h2 class="text-gray-900 text-lg title-font font-medium">
          <slot name="title"></slot>
        </h2>
      </div>
      <div class="flex-grow">
        <p class="leading-relaxed text-base">
          <slot name="description"></slot>
        </p>
        <outbound-link
          :href="outLink"
          class="mt-3 text-primary-500 inline-flex items-center"
        >
          <slot name="link">Learn More</slot>
          <i class="fas fa-long-arrow-alt-right ml-1 fa-sm"></i>
        </outbound-link>
      </div>
    </div>
  </div>
</template>

<script>
import OutboundLink from '@/components/OutboundLink.vue'

export default {
  components: { OutboundLink },
  props: {
    outLink: String,
  },
}
</script>
