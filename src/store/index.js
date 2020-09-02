import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token: null,
    // user: null,
    userId: null,
    outcome: null,
    game: null,
},
  mutations: {
    authUser (state, userData) {
      // state.idToken = userData.token
      state.userId = userData.userId
    },
    changeGame (state, payload) {
      state.game = payload.name
    },
  },
  actions: {
  },
  getters: {
    /* Partially Implemented not for production use */
    loggedIn: state => !!state.userId
  },
})