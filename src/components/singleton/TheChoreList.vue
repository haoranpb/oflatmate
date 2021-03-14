<template>
  <div v-if="schedule && scrollToCurrent()" id="chore-list">
    <h3 class="text-xl font-medium text-gray-600">Chore Schedule</h3>
    <vf-button title="reset" plain class="my-2" @click="resetSchedule">
      <i class="fas fa-undo fa-fw text-gray-600 my-1"></i>
    </vf-button>
    <vf-button title="edit" plain class="my-2" @click="showEdit = !showEdit">
      <i class="fas fa-edit fa-fw text-gray-600 my-1"></i>
    </vf-button>

    <draggable
      v-model="schedule"
      class="overflow-y-auto h-72"
      ref="choreSchedule"
      item-key="id"
      handle=".fa-grip-lines"
      :animation="200"
    >
      <template #item="{ element, index }">
        <div
          class="flex flex-row h-10 px-1 mb-1 rounded-md space-x-3"
          :class="{ current: index == diffByUnit }"
        >
          <i
            title="delete"
            @click="delScheduleAt(index)"
            v-if="showEdit"
            class="flex fas fa-times fa-sm text-gray-500 my-auto"
          ></i>
          <vf-avatar-list class="my-auto" :members="element.workers" />
          <div class="flex-grow"></div>
          <i
            title="handle"
            v-if="showEdit"
            class="flex fas fa-grip-lines my-auto"
          ></i>
        </div>
      </template>
    </draggable>
  </div>
  <div v-else id="chore-list" class="empty-box">
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
    <vf-button primary @click="generateSchedule" class="mt-1 mr-4 float-right">
      Generate
    </vf-button>
  </div>
</template>

<script>
import { shuffle } from '@/utils'
import draggable from 'vuedraggable'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      unit: 'week',
      number: 2,
      startDate: new Date(),
      showEdit: false,
    }
  },
  components: { draggable },
  methods: {
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
    scrollToCurrent() {
      // feel likes a hack to add an event after draggable is rendered
      this.$nextTick(() => {
        this.$refs.choreSchedule.$el.scrollTop = 40 * (this.diffByUnit - 2)
      })
      return true
    },
    delScheduleAt(index) {
      this.$store.commit('delScheduleAt', index)
    },
    resetSchedule() {
      this.$store.commit('resetSchedule')
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
    diffByUnit() {
      // TODO: start.seconds is only available when fetching from firestore
      return dayjs().diff(
        dayjs.unix(this.$store.getters.currentFlat.chore.start.seconds),
        this.$store.getters.currentFlat.chore.unit
      )
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
  @apply bg-gray-200 !important;
}

.current {
  @apply bg-yellow-100 bg-opacity-60;
}

.empty-box {
  @apply border-dashed border-2 border-gray-300 h-56;
}
</style>
