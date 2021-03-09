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

  <vf-modal v-if="showModal">
    <template #title>
      {{ currentModal.title }}
      <span v-if="activeId == 'invite'" class="text-primary-600 font-medium">
        {{ $store.getters.currentFlat.name }}
      </span>
    </template>
    <template #icon>
      <i class="fas text-primary-500" :class="currentModal.icon"></i>
    </template>
    <template #content>
      <vf-input
        solid
        class="mt-3 w-5/6"
        v-model="inputText"
        :placeholder="currentModal.placeholder"
        :status="input.status"
        :message="input.message"
        @keypress="clearDanger"
      />
    </template>
    <template #action>
      <vf-button large primary @click="primary" class="sm:ml-3">
        {{ currentModal.btnText }}
      </vf-button>
    </template>
    <template #close>
      <vf-button simple large @click="closeModal" class="sm:ml-3">
        Cancel
      </vf-button>
    </template>
  </vf-modal>
</template>


<script>
import { validateInput } from '@/utils'

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
      inputText: '',
      input: {
        status: null,
        message: null,
      },
      activeId: null,
      modalObj: {
        invite: {
          title: 'Invite your flatmates to join',
          icon: 'fa-user',
          btnText: 'Invite',
          placeholder: 'Add Email',
        },
        create: {
          title: 'Create a new flat',
          icon: 'fa-home',
          btnText: 'Create',
          placeholder: 'Flat Name',
        },
      },
    }
  },
  methods: {
    openModal({ currentTarget }) {
      this.activeId = currentTarget.id
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.activeId = null
    },
    primary() {
      let validateResult = null

      switch (this.activeId) {
        case 'invite':
          validateResult = validateInput(this.inputText, { email: true })
          break
        case 'create':
          validateResult = validateInput(this.inputText, { length: 25 })
          break
      }

      if (validateResult.error) {
        this.input.status = 'danger'
        this.input.message = validateResult.message
      } else {
        switch (this.activeId) {
          case 'invite':
            this.$func('inviteToFlat', {
              email: validateResult.data,
              flatName: this.$store.getters.currentFlat.name,
              flatId: this.$store.state.currentFlatId,
            }).then(() => {
              this.input.status = 'primay'
              this.input.message = 'Invitation sent'
            })
            break
          case 'create':
            this.$store.commit('createFlat', validateResult.data)
            this.closeModal()
            break
        }
      }

      this.inputText = ''
    },
    clearDanger() {
      this.input.status = null
      this.input.message = null
    },
  },
  computed: {
    currentModal() {
      return this.modalObj[this.activeId]
    },
  },
}
</script>
