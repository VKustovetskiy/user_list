import Vue from 'vue'

// Components
import '@/components'

// Application imports
import App from '@/App'
import store from '@/store'

// Plugins
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
