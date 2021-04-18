<template>
  <vf-button
    plain
    class="text-gray-500"
    @click="openModal"
    v-for="item in headItems"
    :title="item.title"
    :id="item.id"
    :key="item.id"
  >
    <i class="fas my-auto" :class="item.icon"></i>
    <span class="text-lg ml-2">{{ item.text }}</span>
  </vf-button>

  <vf-dialog
    v-if="headModal"
    v-model="headModal"
    :icon="modalOptions.icon"
    :onSubmit="modalOptions.action.callback"
  >
    <template #title>
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        {{ modalOptions.title }}
        <span class="text-primary-600 font-medium">
          {{ modalOptions.titleTail }}
        </span>
      </h3>
    </template>
    <template #content>
      <vf-input
        name="inputText"
        :type="modalOptions.dialog.type"
        :placeholder="modalOptions.dialog.placeholder"
        :rules="modalOptions.dialog.validation"
      />
    </template>
    <template #action>
      <vf-button large primary>
        {{ modalOptions.action.title }}
      </vf-button>
    </template>
  </vf-dialog>
</template>

<script>
import { ref, reactive } from 'vue'
import { string } from 'yup'

export default {
  setup() {
    const headItems = [
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
    ]
    const headModal = ref(false)
    const modalOptions = reactive({})

    return {
      headModal,
      headItems,
      modalOptions,
    }
  },
  methods: {
    openModal({ currentTarget }) {
      this.modalOptions = this.getModalOption(currentTarget.id)
      this.headModal = true // why does it work without `.value` ?
    },
    getModalOption(type) {
      switch (type) {
        case 'invite':
          return {
            title: 'Invite your flatmates to join',
            titleTail: this.$store.getters.currentFlat.name,
            icon: 'fas fa-user',
            dialog: {
              type: 'email',
              placeholder: 'Add Email',
              validation: string().required().email(),
            },
            action: {
              title: 'Invite',
              callback: (values) => {
                this.$func('inviteToFlat', {
                  email: values.inputText,
                  flatName: this.$store.getters.currentFlat.name,
                  flatId: this.$store.state.flat.currentFlatId,
                })
              },
            },
          }
        case 'create':
          return {
            title: 'Create a new flat',
            icon: 'fas fa-home',
            dialog: {
              type: 'text',
              placeholder: 'Flat Name',
              validation: string().required(),
            },
            action: {
              title: 'Create',
              callback: (values) => {
                this.$store.dispatch('createFlat', values.inputText)
              },
            },
          }
      }
    },
  },
}
</script>
