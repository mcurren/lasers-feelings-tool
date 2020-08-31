import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Mission from '@/views/Mission.vue'
import Character from '@/views/Character.vue'
import RunGame from '@/views/RunGame.vue'
import CreateShip from '@/views/CreateShip.vue'
import RollDice from '@/views/RollDice.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Lasers & Feelings App',
    component: Home
  },
  {
    path: '/roll',
    name: 'Roll Dice',
    component: RollDice
  },
  {
    path: '/mission',
    name: 'The Mission',
    component: Mission
  },
  {
    path: '/character',
    name: 'Your Character',
    component: Character
  },
  {
    path: '/run',
    name: 'Run the Game',
    component: RunGame
  },
  {
    path: '/ship',
    name: 'Your Ship',
    component: CreateShip
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
