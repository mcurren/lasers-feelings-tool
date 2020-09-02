import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '@/views/Home.vue'
import Mission from '@/views/Mission.vue'
import Character from '@/views/Character.vue'
import RunGame from '@/views/RunGame.vue'
import CreateShip from '@/views/CreateShip.vue'
import RollDice from '@/views/RollDice.vue'
import Register from '@/views/user/Register.vue'
import Login from '@/views/user/Login.vue'
import Dashboard from '@/views/game/Dashboard.vue'
import NotFound from '@/views/NotFound.vue'

// import { Auth } from '@/firebase/auth'

Vue.use(VueRouter)

// function dynamicPropsFn (router) {
//   const urlParams = new URLSearchParams(window.location.search);
//   const userId = (urlParams.has('id')) ? urlParams.get('id') : null
//   return {
//     id: userId
//   }
// }

const routes = [
  {
    path: '/',
    name: 'Lasers & Feelings App',
    component: Home,
  },
  {
    path: '/roll',
    name: 'Roll Dice',
    component: RollDice,
  },
  {
    path: '/mission',
    name: 'The Mission',
    component: Mission,
  },
  {
    path: '/character',
    name: 'Your Character',
    component: Character,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/run',
    name: 'Run the Game',
    component: RunGame,
  },
  {
    path: '/ship',
    name: 'Your Ship',
    component: CreateShip,
  },
  {
    path: '/user/register/:game?',
    name: 'Sign Up',
    component: Register,
    props: true,
  },
  {
    path: '/user/login/:game?',
    name: 'Sign In',
    props: true,
    component: Login
  },
  {
    path: '/game/:game?',
    name: 'Dashboard',
    component: Dashboard,
    props: true,
    meta: {
      requiresAuth: true,
    },
    // children: [
    //   {
    //     path: 'character',
    //     component: Character,
    //     meta: {
    //       requiresAuth: true,
    //     },
    //   },
    // ],
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // reset the roll outcome (background color)
  // $emit('updateOutcome', null) // NOT WORKING!!
  // check authentication
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (store.getters.loggedIn) {
      next()
      return
    } else {
      next('/user/login')
    }
  }
  next()
});

export default router
