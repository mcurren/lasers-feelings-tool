<template>
  <div class="lasers-feelings">
    <transition 
      name="rollFade"
      @before-enter="resetInputs"
      @after-enter="resetCurrentRolls">
      <section class="settings" v-show="!hasRolled">
        <v-card
          flat
          shaped
          max-width="600px"
          elevation="0">
          <v-card-text>
            <h3 class="overline mb-3 mt-0">Character Number</h3>
            <v-slider
              v-model="targetNumber"
              thumb-label="always"
              color="info"
              track-color="warning"
              min="2"
              max="5"
              ticks="always"
              :thumb-size="24"
              class="slider"
              hide-details>
              <template v-slot:prepend>
                <v-btn
                  fab
                  small
                  elevation="0"
                  color="#f7edfd"
                  @click="decrement"
                  class="slider-button">
                  <!-- <v-icon
                    color="secondary">
                    mdi-minus
                  </v-icon> -->
                  <v-icon
                    color="error">
                    mdi-heart
                  </v-icon>
                </v-btn>
              </template>
              <template v-slot:append>
                <v-btn
                  fab
                  small
                  elevation="0"
                  color="#f7edfd"
                  @click="increment"
                  class="slider-button">
                  <v-icon
                    color="success">
                    mdi-brain
                  </v-icon>
                  <!-- <v-icon
                    color="secondary">
                    mdi-plus
                  </v-icon> -->
                </v-btn>
              </template>
             </v-slider>

            <h3 class="overline mb-0">Roll</h3>
            <v-btn-toggle 
              background-color="accent"
              color="primary"
              v-model="rollType">
              <v-btn value="lasers">Lasers</v-btn>
              <v-btn value="feelings">Feelings</v-btn>
            </v-btn-toggle>

            <div v-show="hasRollType">
              <h3 class="overline mb-0 mt-3">Number Of Dice</h3>
              <v-btn-toggle 
                background-color="accent"
                color="primary"
                v-model="diceNum">
                <v-btn value="1">
                  <v-icon>mdi-dice-1-outline</v-icon>
                </v-btn>
                <v-btn value="2">
                  <v-icon>mdi-dice-1-outline</v-icon>
                  <v-icon>mdi-dice-2-outline</v-icon>
                </v-btn>
                <v-btn value="3">
                  <v-icon>mdi-dice-1-outline</v-icon>
                  <v-icon>mdi-dice-2-outline</v-icon>
                  <v-icon>mdi-dice-3-outline</v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              v-show="hasRollType && hasDiceNum"
              class="mb-2"
              x-large 
              rounded
              block
              elevation="0"
              color="primary"
              @click="rollDice()">
              <v-icon left light>mdi-dice-multiple-outline</v-icon> Roll!
            </v-btn>
          </v-card-actions>
        </v-card>
      </section>
    </transition>

    <transition 
      name="resultFade">
      <section class="results" v-show="hasRolled">
        <v-card
          flat
          shaped
          elevation="0"
          class="mb-6">
          <v-card-text>
            <p class="rolls mt-3 mb-3">
              <span v-for="(dice, index) in currentRolls" :key="index">
                <v-icon left x-large :color="dice.result">mdi-dice-{{ dice.roll }}-outline</v-icon>
              </span>
            </p>
            <p class="outcome headline mt-3 mb-3" v-html="showOutcome"></p>
            <p class="laserfeelings headline mt-3 mb-3" v-if="hasLaserFeelings">And you've got <em class="win">Laser Feelings</em>!</p>
          </v-card-text>
        </v-card>
        <v-btn 
          class="mb-2"
          x-large 
          shaped
          block
          elevation="4"
          color="info"
          @click="doTransition()">
          New Roll
        </v-btn>
      </section>
    </transition>
  </div>
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
        "Oh no, it's a <em class='fail'>total failure</em>!",
        "It's a... <em class='mixed'>mixed success</em>.",
        "Huzzah, you did it.",
        "Holy <em>$#!%</em>, it's a <strong class='win'>critical success</strong>!!",
      ],
      hasRolled: false,
    }),
    computed: {
      hasRollType () {
        return (this.rollType) ? true : false
      },
      hasDiceNum () {
        return (this.diceNum) ? true : false
      },
      showOutcome () {
        const successes = this.currentRolls.filter(item => item.result === 'success')
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
            result = 'success'
          }
          else if (roll > this.targetNumber) {
            result = (this.rollType === 'feelings') ? 'success' : 'failure'
          }
          else if (roll < this.targetNumber) {
            result = (this.rollType === 'lasers') ? 'success' : 'failure'
          }
          // add outcome to currentRolls tally
          this.currentRolls.push({
            roll: roll,
            result: result
          })
        }
        // transition to outcome
        this.doTransition()
        // log the rolls to console
        console.log(`rolls:`, this.currentRolls)
      },
      doTransition () {
        this.hasRolled = !this.hasRolled
      },
      resetInputs () {
        // reset form to start over
        this.rollType = null
        this.diceNum = null
      },
      resetCurrentRolls () {
        // reset rolls to start over
        this.currentRolls = []
      },
      decrement () {
        if (this.targetNumber < 3) return
        this.targetNumber--
      },
      increment () {
        if (this.targetNumber > 4) return
        this.targetNumber++
      },
    }
  }
</script>
<style lang="scss" scoped>
  .lasers-feelings {
    max-width: 580px;
    margin: 0 auto;
    position: relative;
    section {
      margin: 2rem 0.75rem;
    }
  }

  .slider {
    align-items: center;
  }
  // .slider-button {
  //   padding: 0 !important;
  // }

  .results {
    .rolls {
      .v-icon {
        font-size: 60px !important;
      }
    }
    .outcome,
    .laserfeelings {
      @media (max-width: 600px) {
        font-size: 1.3rem !important;
        line-height: 1.8rem;
      }
    }
  }

  .rollFade-enter-to {
    transition-delay: 0.6s;
    position: static;
    height: auto;
  }
  .rollFade-enter {
    position: absolute;
    height: 0;
  }
  .rollFade-enter-active, 
  .rollFade-leave-active {
    transition-property: opacity, transform;
    transition-duration: 0.6s;
  }
  .rollFade-enter, 
  .rollFade-leave-to {
    opacity: 0;
    transform: translateY(-50%);
  }
  .resultFade-enter-to {
    transition-delay: 0.6s;
  }
  .resultFade-enter-active, 
  .resultFade-leave-active {
    transition-property: opacity, transform;
    transition-duration: 0.6s;
  }
  .resultFade-leave-active {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .resultFade-enter, 
  .resultFade-leave-to {
    opacity: 0;
    transform: translateY(50%);
  }
</style>