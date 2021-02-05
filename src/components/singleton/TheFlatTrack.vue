<template>
  <div id="flat-track" class="bg-indigo-50 container flex flex-grow py-4">
    <flat-item>
      <template #middle>
        <vf-input name="flat_name" v-model="flatName" placeholder="Flat Name" />
      </template>
      <template #bottom>
        <vf-button primary type="submit" @click="createFlat" class="mb-3">
          Create
        </vf-button>
      </template>
    </flat-item>
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
import VfButton from '@/components/vf/VfButton.vue'
import VfInput from '@/components/vf/VfInput.vue'
import FlatItem from '@/components/FlatItem.vue'
import VfAvatarList from '@/components/vf/VfAvatarList.vue'

export default {
  data() {
    return {
      flatName: '',
    }
  },
  components: { VfButton, VfInput, FlatItem, VfAvatarList },
  methods: {
    createFlat() {
      this.$store.commit('createFlat', this.flatName)
    },
    chooseFlat(id) {
      console.log('flat is chosen:' + id)
    },
  },
  computed: {
    flats() {
      return this.$store.state.flats
    },
  },
}
</script>
