<template>
  <div class="game">
    <section class="mb-2">
      <template v-if="game">
        <v-card
          shaped>
            <v-card-title>Your Game</v-card-title>
            <v-card-text>
              <p>Current game: <strong>{{ game }}</strong></p>
              <p v-if="currentGame && currentGame.host === userId">You are the host of this game.</p>
            </v-card-text>
        </v-card>
      </template>
      <template v-else>
        <v-card 
          v-if="userGames.length"
          shaped
          class="mb-6">
          <v-card-title>Your Games</v-card-title>
          <v-card-text>
            <p v-for="game in userGames" :key="game.id">
              <a href="#" @click.prevent="switchGame(game.id)">{{ game.id }}</a>
            </p>
          </v-card-text>
        </v-card>
        <v-card
          shaped>
          <v-card-title>Host A New Game</v-card-title>
          <v-card-text>
            <p>
              <v-btn @click="createGame">Start</v-btn>
            </p>
          </v-card-text>
        </v-card>
      </template>
    </section>
  </div>
</template>

<script>
import { db } from '@/firebase/db'
// import { Auth } from '@/firebase/auth'
import words from '@/randomize/words'

export default {
  name: 'Dashboard',
  props: {
    game: {
      type: String,
      required: false,
      default: null,
    },
  },
  firestore: {
    games: db.collection('games'),
  },
  data () {
    return {
      games: [], // for firebase binding
    }
  },
  computed: {
    userId () {
      return this.$store.state.userId
    },
    userGames () {
      return this.games.filter((game) => game.host === this.userId)
    },
    currentGame () {
      const arr = this.games.filter((game) => game.id === this.game)
      return (arr.length) ? arr[0] : false
    },
  },
  methods: {
    getRandom (array) {
      const max = array.length - 1
      const rand = Math.floor(Math.random() * max)
      return array[rand]
    },
    getName () {
      // make a name
      let name = `${this.getRandom(words.adjectives)}-${this.getRandom(words.nouns)}`
      // make sure the name is unique
      while (this.games.find((item) => item.name === name)) {
        name = `${this.getRandom(words.adjectives)}-${this.getRandom(words.nouns)}`
      }
      return name
    },
    addGame (name, userId) {
      db.collection('games')
        .doc(name)
        .set({
          host: userId
        })
        .then(() => {
          console.log('game created!')
          this.$router.push(`/game/${name}`)
        })
    },
    createGame () {
      const name = this.getName()
      const userId = this.$store.state.userId
      if (name && userId) {
        this.addGame(name, userId)
      }
    },
    switchGame (name) {
      this.$router.push(`/game/${name}`)
    },
  },
  mounted () {
    // reset outcome from rolls
    this.$emit('updateOutcome', null)
    // change game in store
    if (this.game) {
      this.$store.commit('changeGame', {
        name: this.game
      })
    }
  },
}
</script>

<style lang="scss" scoped>
p {
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>