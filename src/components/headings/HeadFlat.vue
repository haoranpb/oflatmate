<template>
  <vf-button
    plain
    class="text-gray-500"
    @click="openModal"
    v-for="item in items"
    :title="item.title"
    :id="item.id"
    :key="item.id"
  >
    <i class="fas my-auto" :class="item.icon"></i>
    <span class="text-lg ml-2">{{ item.text }}</span>
  </vf-button>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      items: [
        {
          title: 'Create a new flat',
          icon: 'fa-igloo',
          text: 'New Flat',
          id: 'create',
        },
        {
          title: 'Invite your flatmates',
          icon: 'fa-user-friends',
          text: 'Invite',
          id: 'invite',
        },
      ],
    }
  },
  methods: {
    openModal({ currentTarget }) {
      const modalOptions = this.getModalOption(currentTarget.id)
      this.$vfModal(modalOptions)
    },
    getModalOption(type) {
      switch (type) {
        case 'invite':
          return {
            title: 'Invite your flatmates to join',
            icon: 'fa-user',
            type: 'dialog',
            dialog: {
              placeholder: 'Add Email',
              validation: { email: true },
            },
            action: {
              title: 'Invite',
              callback: (validResult) => {
                this.$func('inviteToFlat', {
                  email: validResult.data,
                  flatName: this.$store.getters.currentFlat.name,
                  flatId: this.$store.state.flat.currentFlatId,
                })
              },
            },
          }
        case 'create':
          return {
            title: 'Create a new flat',
            icon: 'fa-home',
            type: 'dialog',
            dialog: {
              placeholder: 'Flat Name',
              validation: { length: 25 },
            },
            action: {
              title: 'Create',
              callback: (validResult) => {
                this.$store.dispatch('createFlat', validResult.data)
              },
            },
          }
      }
    },
  },
}
</script>
