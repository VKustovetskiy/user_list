import Vue from 'vue'

import Vuetify, {
  VLayout,
  VBtn,
  VIcon,
  VDataTable,
  VDialog,
  VCard,
  VTextField,
  VForm,
  VDivider,
  VSubheader,
  VSpacer
} from 'vuetify/lib'
import { Ripple, Resize } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VLayout,
    VBtn,
    VIcon,
    VDataTable,
    VDialog,
    VCard,
    VTextField,
    VForm,
    VDivider,
    VSubheader,
    VSpacer
  },
  directives: {
    Ripple,
    Resize
  }
})

export default new Vuetify
VForm