import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Mission from '@/views/Mission.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Roll',
    component: Home
  },
  {
    path: '/mission',
    name: 'Mission',
    component: Mission
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
