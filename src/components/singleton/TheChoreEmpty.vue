<template>
  <div id="chore-list" class="empty-box">
    <p class="text-gray-500">
      It seems that you don't have a chore schedule yet, create one now👇
    </p>
    <div class="flex flex-row mt-4 justify-center">
      <vf-select v-model="number" solid small>
        <option>1</option>
        <option selected>2</option>
        <option>3</option>
      </vf-select>
      <span class="mx-1 leading-loose">people, every</span>
      <vf-select v-model="unit" solid small>
        <option>day</option>
        <option selected>week</option>
        <option>month</option>
      </vf-select>
    </div>
    <div class="flex flex-row justify-center mt-2 mb-3">
      <span class="mx-1">starts from</span>
      <vf-calender v-model="startDate" />
    </div>
    <div>
      <vf-avatar-list
        :members="$store.getters.currentFlat.member"
        :plus="true"
        @clickPlus="showDummy = true"
      />
    </div>
    <vf-button primary @click="generateSchedule" class="mt-1 mr-4 float-right">
      Generate
    </vf-button>

    <vf-modal v-if="showDummy">
      <template #title>Create a temparary account</template>
      <template #icon>
        <i class="fas fa-ghost text-primary-500"></i>
      </template>
      <template #content>
        <p class="text-gray-700 text-sm">
          Add a dummy account to the chore schedule if your flatmate hasn't
          accept your invitation to join yet
        </p>
        <vf-input
          solid
          class="mt-3 w-5/6"
          v-model="inputText"
          placeholder="Dummy user name"
          :status="input.status"
          :message="input.message"
          @keypress="clearDanger"
        />
      </template>
      <template #action>
        <vf-button large primary @click="createDummy" class="sm:ml-3">
          Create
        </vf-button>
      </template>
      <template #close>
        <vf-button simple large @click="showDummy = false" class="sm:ml-3">
          Cancel
        </vf-button>
      </template>
    </vf-modal>
  </div>
</template>

<script>
import { shuffle } from '@/utils'

export default {
  data() {
    return {
      unit: 'week',
      number: 2,
      startDate: new Date(),
      // dummy
      showDummy: false,
      inputText: '',
      input: {
        status: null,
        message: null,
      },
    }
  },
  methods: {
    clearDanger() {
      this.input.status = null
      this.input.message = null
    },
    createDummy() {
      // TODO
      console.log(this.inputText)
    },
    generateSchedule() {
      const residentNum = this.$store.getters.currentFlat.member.length
      /*
        Total number of combinations: C(n, k), the number of all workers
         in those combinations: k*C(n, k), so the member has to repeat itself
         for k*C(n, k)/n times.

        Instead of generating all combinations, becase this way feels faster
      */
      if (residentNum > this.number) {
        let arrTimes = 1
        for (let i = this.number; i < residentNum; i++) arrTimes *= i
        for (let i = 1; i <= residentNum - this.number; i++) arrTimes /= i

        const schedule = Array(arrTimes)
          .fill(shuffle(this.$store.getters.currentFlat.member))
          .flat()
          .reduce((arr, item, idx) => {
            return idx % this.number === 0
              ? [...arr, [item]]
              : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
          }, [])
          .map((val, i) => {
            return { workers: val, id: i }
          })

        this.$store.commit('genSchedule', {
          schedule: schedule,
          unit: this.unit,
          start: this.startDate,
        })
      } else {
        // TODO: pop a warning notification
        console.log('error')
      }
    },
  },
}
</script>

<style scoped>
.empty-box {
  @apply border-dashed border-2 border-gray-300 h-64;
}
</style>
