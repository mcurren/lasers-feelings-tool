<template>
  <main>
    <section class="settings">
      <v-card
        flat
        outlined>
        <v-card-text>
          <h3 class="overline mb-6">Character Number</h3>
          <v-slider
            class="mb-2"
            v-model="targetNumber"
            thumb-label="always"
            prepend-icon="mdi-heart"
            append-icon="mdi-brain"
            min="2"
            max="5"
          ></v-slider>

          <h3 class="overline mb-2">Roll</h3>
          <v-btn-toggle 
            class="mb-4"
            v-model="rollType">
            <v-btn value="lasers">Lasers</v-btn>
            <v-btn value="feelings">Feelings</v-btn>
          </v-btn-toggle>

          <div v-show="hasRollType">
            <h3 class="overline mb-2">Number Of Dice</h3>
            <v-btn-toggle 
              v-model="diceNum">
              <v-btn value="1">1</v-btn>
              <v-btn value="2">2</v-btn>
              <v-btn value="3">3</v-btn>
            </v-btn-toggle>
          </div>
        </v-card-text>

        <v-card-actions v-show="hasRollType && hasDiceNum">
          <v-btn 
            tile 
            x-large 
            block
            color="primary" 
            @click="rollDice()">
            <v-icon dark left>mdi-dice-multiple-outline</v-icon> Roll!
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>

    <section class="outcome" v-if="currentRolls.length">
      <v-card
        flat
        outlined
        class="mb-6">
        <v-card-text>
          <p>
            <span v-for="(dice, index) in currentRolls" :key="index">
              <v-icon x-large left>mdi-dice-{{ dice.roll }}-outline</v-icon>
            </span>
          </p>
          <p class="outcome headline mt-4" v-html="showOutcome"></p>
          <p class="laserfeelings headline mt-4" v-if="hasLaserFeelings">And you have <em>Laser Feelings</em> about it!</p>
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
        "Oh no, it's a <em>total</em> failure!",
        "It's a... <em>mixed</em> success.",
        "Huzzah, you did it.",
        "Holy <em>$#!%</em>, it's a <strong>critical success</strong>!!!",
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
    max-width: 600px;
    margin: 0 auto;
    padding: 1em;
  }
  section {
    margin: 2em 0;
  }
</style>