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

            <div v-show="rollType">
              <h3 class="overline mb-0 mt-3">Number Of Dice</h3>
              <v-btn-toggle 
                background-color="accent"
                color="primary"
                v-model="diceNum">
                <v-btn value="1">
                  <!-- <v-icon>mdi-dice-1-outline</v-icon> -->
                  One
                </v-btn>
                <v-btn value="2">
                  Two
                  <!-- <v-icon>mdi-dice-1-outline</v-icon>
                  <v-icon>mdi-dice-2-outline</v-icon> -->
                </v-btn>
                <v-btn value="3">
                  Three
                  <!-- <v-icon>mdi-dice-1-outline</v-icon>
                  <v-icon>mdi-dice-2-outline</v-icon>
                  <v-icon>mdi-dice-3-outline</v-icon> -->
                </v-btn>
                <v-btn value="4">
                  Four
                </v-btn>
              </v-btn-toggle>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              v-show="rollType && diceNum"
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
                <v-icon left x-large :color="dice.color">mdi-dice-{{ dice.number }}-outline</v-icon>
              </span>
            </p>
            <div class="outcome headline mt-3 mb-3" v-html="outcomeText"></div>
            <div class="headline mt-3 mb-3" v-if="hasLaserFeelings">
              <p class="laserfeelings">You have <em class="success--text">Laser Feelings</em>!</p>
              <p class="rules">You get a special insight into what’s going on. Ask the GM a question and they’ll answer you honestly.</p>
            </div>
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

    <v-snackbar
      light
      multiLine
      elevation="1"
      timeout="6000"
      color="warning"
      transition="slide-y-reverse-transition"
      v-model="alert.show">
      {{ alert.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="secondary"
          text
          v-bind="attrs"
          @click="alert.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'Main',
    data: () => ({
      targetNumber: 3,
      rollType: null,
      diceNum: null,
      currentRolls: [],
      outcomes: {
        0: {
          flavor: "<strong class='error--text'>Oh no!</strong>",
          rules: "It goes wrong. The GM says how things get worse somehow.",
        },
        1: {
          flavor: "<strong class='warning--text'>Meh...</strong>",
          rules: "You barely manage it. The GM inflicts a complication, harm, or cost.",
        },
        2: {
          flavor: "<strong class='success--text'>Huzzah!</strong>",
          rules: "You do it well.",
        },
        3: {
          flavor: "<strong class='success--text'>Holy smokes!!</strong>",
          rules: "You get a critical success. The GM tells you some extra effect you get.",
        },
      },
      hasRolled: false,
      alert: {
        show: false,
        text: null
      }
    }),
    mounted () {
      // load data from local storage if available
      const number = localStorage.getItem('targetNumber')
      if (number) {
        this.targetNumber = number
        // alert the user
        this.alert.text = `Loaded your most recent character number (${number}).`
        this.alert.show = true
      }
    },
    computed: {
      outcomeText () {
        // get the correct flavor text from data
        const successes = this.currentRolls.filter(item => item.success)
        const index = (successes.length > 3) ? 3 : successes.length
        const outcome = this.outcomes[index]
        return `<p class="flavor">${outcome.flavor}</p><p class="rules">${outcome.rules}</p>`
      },
      hasLaserFeelings () {
        // show laser feelings text if any roll equals the target number
        return (this.currentRolls.filter(item => item.number === this.targetNumber).length) ? true : false
      },
    },
    methods: {
      rollDice () {
        let totalRolls = parseInt(this.diceNum)
        // loop through rolls needed
        for (let step = 0; step < totalRolls; step++) {
          // roll 1d6
          let roll = {
            number: 1 + Math.floor(Math.random() * 6)
          }
          // determine roll success
          if (roll.number === this.targetNumber) {
            roll.success = true
            roll.color = '#01a8a5'
          }
          else if (this.rollType === 'feelings' && roll.number > this.targetNumber) {
            roll.success = true
            roll.color = '#01a8a5'
          }
          else if (this.rollType === 'lasers' && roll.number < this.targetNumber) {
            roll.success = true
            roll.color = '#01a8a5'
          }
          else {
            roll.success = false,
            roll.color = '#d4396f'
          }
          // add outcome to currentRolls tally
          this.currentRolls.push(roll)
        }
        // transition to outcome
        this.doTransition()
        // log the rolls to console
        console.log(`rolls:`, this.currentRolls)
      },
      doTransition () {
        // switch between form & outcome
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
        // slider minus button
        if (this.targetNumber < 3) return
        this.targetNumber--
      },
      increment () {
        // slider plus button
        if (this.targetNumber > 4) return
        this.targetNumber++
      },
    },
    watch: {
      targetNumber: function (newNumber, oldNumber) {
        if (newNumber === oldNumber) return
        // save target number to local storage when changed
        localStorage.setItem('targetNumber', newNumber)
        console.log('target number saved.')
      },
    },
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
  .results {
    .rolls {
      .v-icon {
        font-size: 60px !important;
      }
    }
    .outcome {
      @media (max-width: 600px) {
        font-size: 1.3rem !important;
        line-height: 1.8rem;
      }
    }
    .laserfeelings {
      @media (max-width: 600px) {
        font-size: 1.15rem !important;
        line-height: 1.6rem;
      }
    }
  }

  // custom transitions
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