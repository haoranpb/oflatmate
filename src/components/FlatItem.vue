<template>
  <div class="shadow rounded-md w-full md:w-1/2 lg:w-2/5 mx-2 p-5">
    <h3 class="font-medium text-xl">{{ flat.name }}</h3>
    <div v-if="users" class="flex -space-x-2 overflow-hidden">
      <img
        v-for="member in users"
        :key="member.uid"
        :src="member.photoURL"
        class="inline-block h-8 w-8 rounded-full ring-2 ring-white"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: null,
    }
  },
  props: {
    flat: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    let getPhotoURL = this.$func.httpsCallable('getUsersInfo')
    getPhotoURL(this.flat.member).then((result) => {
      this.users = result.data.users
    })
  },
}
</script>
