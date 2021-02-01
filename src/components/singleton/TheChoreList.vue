<template>
  <div
    id="chore-list"
    class="border-dashed border-2 border-gray-300 rounded-md inline-block p-6 w-80"
  >
    <p class="text-gray-600">
      It seems that you don't have a chore schedule yet, create one now👇
    </p>
    <div class="flex flex-row my-4 justify-center">
      <vf-select solid small>
        <option>1</option>
        <option selected>2</option>
        <option>3</option>
      </vf-select>
      <span class="mx-1 leading-loose">people, every</span>
      <vf-select solid small>
        <option>day</option>
        <option selected>week</option>
        <option>month</option>
      </vf-select>
    </div>
    <vf-button primary @click="generateSchedule" class="mt-1 mr-6 float-right">
      Generate
    </vf-button>
  </div>
</template>

<script>
import VfSelect from '@/components/vf/VfSelect.vue'
import VfButton from '@/components/vf/VfButton.vue'

export default {
  components: { VfSelect, VfButton },
  methods: {
    generateSchedule() {
      console.log('Chore Schudule generated')
    },
  },
}
</script>
