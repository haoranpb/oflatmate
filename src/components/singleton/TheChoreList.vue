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

  <the-chore-empty v-else />
</template>

<script>
import TheChoreEmpty from '@/components/singleton/TheChoreEmpty.vue'
import draggable from 'vuedraggable'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      showEdit: false,
    }
  },
  components: { draggable, TheChoreEmpty },
  methods: {
    scrollToCurrent() {
      // feel likes a hack to add an event after draggable is rendered
      this.$nextTick(() => {
        this.$refs.choreSchedule.$el.scrollTop = 40 * (this.diffByUnit - 2)
      })
      return true
    },
    delScheduleAt(index) {
      if (confirm('Are you sure to delete the schedule entry?')) {
        this.$store.commit('delScheduleAt', index)
      }
    },
    resetSchedule() {
      // How to achieve this behavior with vf-modal?
      if (confirm('Are you sure to reset the chore schedule?')) {
        this.$store.commit('resetSchedule')
      }
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
</style>
