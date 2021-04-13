import VfTextarea from './VfTextarea.vue'
import VfSelect from './VfSelect.vue'
import VfModal from './VfModal.vue'
import VfInput from './VfInput.vue'
import VfForm from './VfForm.vue'
import VfCalender from './VfCalender.vue'
import VfButton from './VfButton.vue'
import VfAvatarList from './VfAvatarList.vue'
import VfAvatarItem from './VfAvatarItem.vue'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

// there may be a better way to import all these components
export default {
  install: (app) => {
    app.component('vf-avatar-item', VfAvatarItem)
    app.component('vf-avatar-list', VfAvatarList)
    app.component('vf-button', VfButton)
    app.component('vf-calender', VfCalender)
    app.component('vf-input', VfInput)
    app.component('vf-form', VfForm)
    app.component('vf-modal', VfModal)
    app.component('vf-select', VfSelect)
    app.component('vf-textarea', VfTextarea)

    app.config.globalProperties.$vfModal = (options) => {
      // global event, not sure if there is a better way to do this
      document.dispatchEvent(
        new CustomEvent('vfModal:open', { detail: options })
      )
    }
  },
}
