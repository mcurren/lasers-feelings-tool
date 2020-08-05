<template>
  <main>
    <section class="settings">
      <v-card
        flat
        shaped
        outlined>
        <v-card-text>
          <h3 class="overline mb-6 mt-0">Character Number</h3>
          <v-slider
            v-model="targetNumber"
            thumb-label="always"
            color="info"
            track-color="warning"
            prepend-icon="mdi-heart"
            append-icon="mdi-brain"
            min="2"
            max="5"
          ></v-slider>

          <h3 class="overline mb-0">Roll</h3>
          <v-btn-toggle 
            background-color="accent"
            color="primary"
            dense
            v-model="rollType">
            <v-btn value="lasers">Lasers</v-btn>
            <v-btn value="feelings">Feelings</v-btn>
          </v-btn-toggle>

          <div v-show="hasRollType">
            <h3 class="overline mb-0 mt-3">Number Of Dice</h3>
            <v-btn-toggle 
              background-color="accent"
              color="primary"
              dense
              v-model="diceNum">
              <v-btn value="1">1</v-btn>
              <v-btn value="2">2</v-btn>
              <v-btn value="3">3</v-btn>
            </v-btn-toggle>
          </div>
        </v-card-text>

        <v-card-actions v-show="hasRollType && hasDiceNum">
          <v-btn 
            class="mb-2"
            x-large 
            rounded
            block
            elevation="0"
            color="info"
            @click="rollDice()">
            <v-icon left light>mdi-dice-multiple-outline</v-icon> Roll!
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>

    <section class="results" v-if="currentRolls.length">
      <v-card
        flat
        shaped
        outlined
        class="mb-6">
        <v-card-text>
          <p class="rolls mt-3 mb-3">
            <span v-for="(dice, index) in currentRolls" :key="index">
              <v-icon x-large left>mdi-dice-{{ dice.roll }}-outline</v-icon>
            </span>
          </p>
          <p class="outcome headline mt-3 mb-3" v-html="showOutcome"></p>
          <p class="laserfeelings headline mt-3 mb-3" v-if="hasLaserFeelings">And you have <em class="win">Laser Feelings</em> about it!</p>
        </v-card-text>
      </v-card>
    </section>
  </main>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data: () => ({
      targetNumber: 3,
      rollType: null,
      diceNum: null,
      currentRolls: [],
      outcomeText: [
        "Oh no, it's a <em class='failure'>total failure</em>!",
        "It's a... <em class='mixed'>mixed success</em>.",
        "Huzzah, you did it.",
        "Holy <em>$#!%</em>, it's a <strong class='win'>critical success</strong>!!!",
      ],
    }),
    computed: {
      hasRollType () {
        return (this.rollType) ? true : false
      },
      hasDiceNum () {
        return (this.diceNum) ? true : false
      },
      showOutcome () {
        const successes = this.currentRolls.filter(item => item.result === 'Success')
        return this.outcomeText[successes.length]
      },
      hasLaserFeelings () {
        return (this.currentRolls.filter(item => item.roll === this.targetNumber).length) ? true : false
      },
    },
    methods: {
      rollDice () {
        // reset current rolls
        this.currentRolls = []
        // do rolls
        for (let step = 0; step < parseInt(this.diceNum); step++) {
          // roll 1d6
          const roll = 1 + Math.floor(Math.random() * 6)
          // determine roll result
          let result = null
          if (roll === this.targetNumber) {
            result = 'Success'
          }
          else if (roll > this.targetNumber) {
            result = (this.rollType === 'feelings') ? 'Success' : 'Failure'
          }
          else if (roll < this.targetNumber) {
            result = (this.rollType === 'lasers') ? 'Success' : 'Failure'
          }
          // add outcome to currentRolls tally
          this.currentRolls.push({
            roll: roll,
            result: result
          })
        }
        // reset form to start over
        this.rollType = null
        this.diceNum = null
        // log the rolls to console
        console.log(`rolls:`, this.currentRolls)
      }
    }
  }
</script>
<style lang="scss" scoped>
  main {
    max-width: 580px;
    margin: 0 auto;
    padding: 1em;
  }
  section {
    margin: 2em 0;
  }
</style>