<template>
  <div id="chore-list" class="empty-box">
    <p class="text-gray-500">
      It seems that you don't have a chore schedule yet, create one now👇
    </p>
    <div class="flex flex-row my-4 justify-center">
      <vf-select v-model="numPerSchedule" solid small>
        <option>1</option>
        <option selected>2</option>
        <option>3</option>
      </vf-select>
      <span class="mx-1 leading-loose">people, every</span>
      <vf-select v-model="rate" solid small>
        <option>day</option>
        <option selected>week</option>
        <option>month</option>
      </vf-select>
    </div>
    <vf-button primary @click="generateSchedule" class="mt-1 mr-4 float-right">
      Generate
    </vf-button>
  </div>
</template>

<script>
import VfSelect from '@/components/vf/VfSelect.vue'
import VfButton from '@/components/vf/VfButton.vue'

export default {
  data() {
    return {
      rate: 'week',
      numPerSchedule: 2,
      schedule: null,
    }
  },
  components: { VfSelect, VfButton },
  methods: {
    generateSchedule() {
      const residentNum = this.$store.getters.currentFlat.member.length
      const gcd = this.gcd(residentNum, this.numPerSchedule)
      const arrTimes = gcd == 1 ? this.numPerSchedule : gcd

      // Everyone same workload, TODO: all combinations
      this.schedule = Array(arrTimes)
        .fill(this.$store.getters.currentFlat.member)
        .flat()
        .reduce((arr, item, idx) => {
          return idx % this.numPerSchedule === 0
            ? [...arr, [item]]
            : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
        }, [])
    },
    gcd(a, b) {
      return a ? this.gcd(b % a, a) : b
    },
  },
}
</script>
