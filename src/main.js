import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import VueConfetti from 'vue-confetti'
import { firestorePlugin } from 'vuefire';
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.use(VueConfetti)
Vue.use(firestorePlugin)
Vue.use(Vuelidate)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
