import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import VueConfetti from 'vue-confetti'
import router from './router'

Vue.use(VueConfetti)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
