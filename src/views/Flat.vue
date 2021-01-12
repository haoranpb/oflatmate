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
        <button
          type="submit"
          @click="createFlat"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
      },
    }
  },
  methods: {
    createFlat() {
      this.$db
        .collection('flats')
        .add({
          name: this.form.name,
          creator: this.$user.uid,
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
