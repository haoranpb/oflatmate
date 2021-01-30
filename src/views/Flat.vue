<template>
  <div id="flat">
    <div class="shadow rounded-md w-full md:w-1/2 lg:w-2/5 mx-2">
      <div class="px-4 py-5 sm:p-6">
        <label for="flat_name" class="block text-sm font-medium text-gray-700">
          Flat Name
        </label>
        <!-- Put label as placeholder if no more setting to be added -->
        <input
          type="text"
          name="flat_name"
          v-model="form.name"
          class="mt-1 block sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm rounded-md"
        />
      </div>
      <div class="px-4 py-3 bg-gray-50 text-right">
        <vf-button type="submit" @click="createFlat" primary class="py-2 px-4">
          Create
        </vf-button>
      </div>
    </div>
    <template v-if="flats">
      <flat-item v-for="flat in flats" :key="flat.id" :flat="flat" />
    </template>
  </div>
</template>

<script>
import VfButton from '@/components/VfButton.vue'
import FlatItem from '@/components/FlatItem.vue'

export default {
  data() {
    return {
      form: {
        name: '',
      },
      flats: [],
    }
  },
  components: { VfButton, FlatItem },
  mounted() {
    this.$db
      .collection('flats')
      .get()
      .then((querySnapshot) => {
        this.flats = querySnapshot.docs.map((doc) =>
          Object.assign({ id: doc.id }, doc.data())
        )
      })
  },
  methods: {
    createFlat() {
      this.$db
        .collection('flats')
        .add({
          name: this.form.name,
          creator: this.$user.uid,
          member: [this.$user.uid],
        })
        .then((docRef) => {
          console.log('Document written: ', docRef)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
          this.$router.push('/error')
        })
    },
  },
}
</script>
