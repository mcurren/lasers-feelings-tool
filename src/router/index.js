import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Mission from '@/views/Mission.vue'
import Character from '@/views/Character.vue'

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
  },
  {
    path: '/character',
    name: 'Character',
    component: Character
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
