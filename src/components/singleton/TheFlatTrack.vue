<template>
  <div id="flat-track" class="bg-indigo-50 container flex py-4">
    <flat-item>
      <template #middle>
        <vf-input
          v-model="flatName"
          placeholder="Flat Name"
          :status="input.status"
          :message="input.message"
          @keypress="clearDanger"
        />
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
import { validateInput } from '@/utils'
import VfButton from '@/components/vf/VfButton.vue'
import VfInput from '@/components/vf/VfInput.vue'
import FlatItem from '@/components/FlatItem.vue'
import VfAvatarList from '@/components/vf/VfAvatarList.vue'

export default {
  data() {
    return {
      flatName: '',
      input: {
        status: null,
        message: null,
      },
    }
  },
  components: { VfButton, VfInput, FlatItem, VfAvatarList },
  methods: {
    createFlat() {
      const result = validateInput(this.flatName, { length: 25 })

      if (result.error) {
        this.input.status = 'danger'
        this.input.message = result.message
      } else {
        this.$store.commit('createFlat', result.data)
      }

      this.flatName = ''
    },
    chooseFlat(id) {
      this.$store.commit('setCurrentFlatId', id)
    },
    clearDanger() {
      this.input.status = null
      this.input.message = null
    },
  },
  computed: {
    flats() {
      return this.$store.state.flats
    },
  },
}
</script>
