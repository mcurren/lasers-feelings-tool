<template>
  <div class="roll-dice">
    <transition 
      name="rollFade"
      @before-enter="resetInputs"
      @after-enter="resetCurrentRolls">
      <section class="settings" v-show="!hasRolled">
        <v-card
          flat
          color="rgba(255,255,255,0.6)"
          elevation="0"
          class="mb-6 rounded-xl target-number">
          <NumberSlider @numberChange="changeTargetNumber($event)"/>
        </v-card>

        <v-card
          flat
          shaped
          elevation="0">
          <v-card-subtitle>
            <span>Type of Roll</span> 
            <Dialog>
              <p style="margin-top:1rem;">If you’re using <strong>LASERS</strong> <span class="nowrap">(science, reason)</span>, you want to roll <strong>under</strong> your number.</p>
              <p>If you’re using <strong>FEELINGS</strong>, <span class="nowrap">(rapport, passion)</span> you want to roll <strong>over</strong> your number.</p>
            </Dialog>
          </v-card-subtitle>
          <v-card-text>
            <v-btn-toggle 
              background-color="accent"
              color="primary"
              v-model="rollType">
              <v-btn value="lasers">Lasers</v-btn>
              <v-btn value="feelings">Feelings</v-btn>
            </v-btn-toggle>
          </v-card-text>

          <template v-if="rollType">
            <v-card-subtitle>
              <span>Number of Dice</span> 
              <Dialog>
                <p style="margin-top:1rem;">When you do something risky, roll <strong>1d6</strong> to find out how it goes. Roll <strong>+1d</strong> if you’re <strong>prepared</strong> and <strong>+1d</strong> if you’re an <strong>expert</strong>.</p>
                <p><em>The GM tells you how many dice to roll, based on your character and the situation.</em></p>
              </Dialog>
            </v-card-subtitle>
            <v-card-text>
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
            </v-card-text>
          </template>

          <template v-if="rollType && diceNum">
            <v-card-subtitle>
              <span>Number of Players Helping</span> 
              <Dialog>
                <p style="margin-top:1rem;">If another player is helping you with this roll, they should say how they try to help.</p>
                <p>If they succeed, add <strong>+1d</strong>.</p>
              </Dialog>
            </v-card-subtitle>
            <v-card-text>
              <div class="helper-fields">
                <v-btn
                  fab
                  x-small
                  elevation="0"
                  color="#f7edfd"
                  @click="decrement('helperNum', 0)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <div class="helper-count">
                  <span>{{ helperNum }}</span>
                </div>
                <v-btn
                  fab
                  x-small
                  elevation="0"
                  color="#f7edfd"
                  @click="increment('helperNum', 19)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </template>

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
          elevation="2"
          color="info"
          @click="doTransition()">
          New Roll
        </v-btn>
      </section>
    </transition>
  </div>
</template>

<script>
import Dialog from '@/components/DialogHelp';
import NumberSlider from '@/components/NumberSlider';

export default {
  name: 'RollDice',
  components: {
    Dialog,
    NumberSlider,
  },
  data: () => ({
    targetNumber: 3,
    rollType: null,
    diceNum: null,
    helperNum: 0,
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
  }),
  mounted () {
    // reset outcome from rolls
    this.$emit('updateOutcome', null)
  },
  computed: {
    totalDice () {
      return parseInt(this.diceNum) + this.helperNum
    },
    successes () {
      const successes = this.currentRolls.filter(item => item.success)
      return successes.length
    },
    outcomeText () {
      // get the correct flavor text from data
      const index = (this.successes > 3) ? 3 : this.successes
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
      // loop through rolls needed
      for (let step = 0; step < this.totalDice; step++) {
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
    doConfetti () {
      this.$confetti.start({
        particles: [
          {
            type: 'rect',
          },
          {
            type: 'circle',
          },
          {
            type: 'heart',
            colors: ['#d4396f'],
            size: 10,
          },
        ],
        defaultSize: 8,
        defaultDropRate: 8,
        defaultColors: [
          '#5a1078',
          '#8BC4FE',
          '#b13bbf',
          '#01a8a5',
          '#fab864',
        ],
        particlesPerFrame: 1,
      })
      setTimeout(() => this.$confetti.stop(), 3000)
    },
    doTransition () {
      // switch between form & outcome
      this.hasRolled = !this.hasRolled
      // emit events on transition
      if (this.hasRolled) {
        if (this.successes > 1) {
          this.$emit('updateOutcome', 'success')
          this.doConfetti()
        }
        else if (this.successes === 1) {
          this.$emit('updateOutcome', 'mixed')
        }
        else {
          this.$emit('updateOutcome', 'failure')
        }
      }
      else {
        this.$emit('updateOutcome', null)
      }
    },
    resetInputs () {
      // reset form to start over
      this.rollType = null
      this.diceNum = null
      this.helperNum = 0
    },
    resetCurrentRolls () {
      // reset rolls to start over
      this.currentRolls = []
    },
    changeTargetNumber (number) {
      this.targetNumber = number
    },
  },
}
</script>

<style lang="scss" scoped>
.overline, 
.v-card__subtitle {
  display: flex;
  align-items: center;
  & > span {
    margin-right: 5px;
  }
}
.helper-fields {
  display: flex;
  .helper-count {
    margin: 0 12px;
    width: 40px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
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