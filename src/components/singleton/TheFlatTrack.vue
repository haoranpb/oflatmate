<template>
  <div
    id="flat-track"
    class="bg-indigo-50 rounded-md flex py-4 overflow-x-auto flex-nowrap h-36"
  >
    <template v-if="flats">
      <flat-item
        v-for="flat in flats"
        :key="flat.id"
        @click="chooseFlat(flat.id)"
      >
        <template #middle>
          <h3 class="font-medium text-xl leading-9">{{ flat.name }}</h3>
        </template>
        <template #bottom>
          <vf-avatar-list :members="flat.member" />
        </template>
      </flat-item>
    </template>
  </div>
</template>

<script>
import FlatItem from '@/components/FlatItem.vue'

export default {
  components: { FlatItem },
  methods: {
    chooseFlat(id) {
      this.$store.commit('setCurrentFlatId', id)
    },
  },
  computed: {
    flats() {
      return this.$store.state.flat.flats
    },
  },
}
</script>
