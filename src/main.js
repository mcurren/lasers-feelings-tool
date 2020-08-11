import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import VueConfetti from 'vue-confetti'

Vue.use(VueConfetti)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
