<template>
  <div v-if="schedule" id="chore-list">
    <h3 class="text-xl mb-6 font-medium text-gray-600">Chore Schedule</h3>
    <draggable v-model="schedule" item-key="id" handle=".fa-grip-lines">
      <template #item="{ element }">
        <div class="flex flex-row h-10 mr-2 mb-1">
          <vf-avatar-list class="my-auto" :members="element.workers" />
          <div class="flex-grow"></div>
          <i class="flex fas fa-grip-lines my-auto"></i>
        </div>
      </template>
    </draggable>
  </div>
  <div v-else id="chore-list" class="empty-box">
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
import VfAvatarList from '@/components/vf/VfAvatarList.vue'
import draggable from 'vuedraggable'

export default {
  data() {
    return {
      rate: 'week',
      numPerSchedule: 2,
      active: false,
    }
  },
  components: { VfSelect, VfButton, VfAvatarList, draggable },
  methods: {
    generateSchedule() {
      const residentNum = this.$store.getters.currentFlat.member.length
      const gcd = this.gcd(residentNum, this.numPerSchedule)
      const arrTimes = gcd == 1 ? this.numPerSchedule : gcd

      // Everyone same workload, TODO: all combinations
      const schedule = Array(arrTimes)
        .fill(this.$store.getters.currentFlat.member)
        .flat()
        .reduce((arr, item, idx) => {
          return idx % this.numPerSchedule === 0
            ? [...arr, [item]]
            : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
        }, [])
        .map((val, i) => {
          return { workers: val, id: i }
        })

      this.$store.commit('genSchedule', {
        schedule: schedule,
        rate: this.rate,
        start: new Date(),
      })
    },
    gcd(a, b) {
      return a ? this.gcd(b % a, a) : b
    },
  },
  computed: {
    schedule: {
      get() {
        return this.$store.getters.currentFlat.chore
          ? this.$store.getters.currentFlat.chore.schedule
          : null
      },
      set(value) {
        this.$store.commit('updateSchedule', value)
      },
    },
  },
}
</script>

<style scoped>
.activeItem {
  @apply bg-gray-50;
}

.sortable-ghost {
  @apply bg-gray-100 opacity-30;
}

.sortable-chosen {
  @apply bg-gray-200;
}
</style>
