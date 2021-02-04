<template>
  <div id="flat-track" class="bg-indigo-50 container flex flex-grow py-4">
    <flat-item>
      <template #middle>
        <vf-input
          name="flat_name"
          v-model="form.name"
          placeholder="Flat Name"
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
import VfButton from '@/components/vf/VfButton.vue'
import VfInput from '@/components/vf/VfInput.vue'
import FlatItem from '@/components/FlatItem.vue'
import VfAvatarList from '@/components/vf/VfAvatarList.vue'

export default {
  data() {
    return {
      form: {
        name: '',
      },
      flats: [],
    }
  },
  components: { VfButton, VfInput, FlatItem, VfAvatarList },
  mounted() {
    this.$db
      .collection('flats')
      .where('member', 'array-contains', this.$user.uid)
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
          this.flats.push({
            id: docRef.id,
            name: this.form.name,
            member: [this.$user.uid],
          })
          this.form.name = ''
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
          this.$router.push('/error')
        })
    },
    chooseFlat(id) {
      console.log('flat is chosen:' + id)
    },
  },
}
</script>
