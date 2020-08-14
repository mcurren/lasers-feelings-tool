<template>
  <div class="character">
    <section class="mb-2">
      <v-card
        flat
        shaped
        elevation="0"
        class="mb-6">
        <v-card-text>
          <h3 class="overline mt-0 mb-0">
            <span>Style</span> 
          </h3>
          <v-select
            :items="styles"
            placeholder="Choose"
            v-model="character.style"
            class="pt-0 mt-0"
          ></v-select>
          <h3 class="overline mt-0 mb-0">
            <span>Role</span> 
          </h3>
          <v-select
            :items="roles"
            placeholder="Choose"
            v-model="character.role"
            class="pt-0 mt-0"
          ></v-select>
          <h3 class="overline mb-2 mt-0">
            <span>Character Number</span> 
            <Dialog>
              <p style="margin-top:1rem;">Choose your <strong>number</strong>, from 2 to 5, by dragging the slider or using the <span class="nowrap"><v-icon small color="error">mdi-heart</v-icon>/<v-icon small color="success">mdi-brain</v-icon></span> buttons.</p>
              <p>A high number means you’re better at <strong>LASERS</strong> (technology; science; cold rationality; calm, precise action).</p>
              <p>A low number means you’re better at <strong>FEELINGS</strong> (intuition; diplomacy; seduction; wild, passionate action).</p>
              <p><em>Note: once you set this number, it should not change for the rest of the game.</em></p>
            </Dialog>
          </h3>
          <v-slider
            v-model="targetNumber"
            thumb-label="always"
            color="info"
            track-color="warning"
            min="2"
            max="5"
            ticks="always"
            :thumb-size="24"
            class="slider align-center"
            hide-details>
            <template v-slot:prepend>
              <v-btn
                fab
                small
                elevation="0"
                color="#f7edfd"
                @click="decrement('targetNumber', 2)"
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
                @click="increment('targetNumber', 5)"
                class="slider-button">
                <v-icon
                  color="success">
                  mdi-brain
                </v-icon>
              </v-btn>
            </template>
          </v-slider>
          <h3 class="overline mt-3 mb-0">
            <span>Name</span> 
          </h3>
          <v-text-field
            placeholder="Your Name"
            v-model="character.name"
            class="pt-0 mt-0"
          ></v-text-field>
          <h3 class="overline mt-0 mb-0">
            <span>Personal Goal</span> 
          </h3>
          <v-select
            :items="goals"
            placeholder="Choose your Goal"
            v-model="character.goal"
            class="pt-0 mt-0"
          ></v-select>
          <v-text-field
            v-if="character.goal === 'Other'"
            label="Your Goal"
            v-model="character.otherGoal"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </section>

    <section v-show="characterDone">
      <v-card
        flat
        shaped
        elevation="0">
        <v-card-text>
          <h2 class="text--h5 mb-3 mt-3">Ok, all set!</h2>
          <h3 class="text--h6 mb-1">You have:</h3>
          <ul class="mb-3">
            <li>A Consortium uniform (with built-in vacc-suit for space walks).</li>
            <li>A super-sweet space-phone-cameracommunicator-scanner thing (with universal translator).</li>
            <li>A variable-beam phase pistol (set to stun, usually).</li>
          </ul>
        </v-card-text>
      </v-card>
    </section>

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
import Dialog from '@/components/DialogHelp';

export default {
  name: 'Mission',
  components: {
    Dialog,
  },
  data: () => ({
    character: {
      style: null,
      role: null,
      name: null,
      goal: null,
      otherGoal: null,
    },
    targetNumber: 3,
    styles: ['Alien', 'Android', 'Dangerous', 'Heroic', 'Hot-Shot', 'Intrepid', 'Savvy'],
    roles: ['Doctor', 'Envoy', 'Engineer', 'Explorer', 'Pilot', 'Scientist', 'Soldier'],
    goals: ['Become Captain', 'Meet New Aliens', 'Shoot Bad Guys', 'Find New Worlds', 'Solve Weird Space Mysteries', 'Prove Yourself', 'Keep Being Awesome', 'Other'],
    alert: {
      show: false,
      text: null,
    },
  }),
  computed: {
    goalSet () {
      if (!this.character.goal) {
        return false
      }
      else if (this.character.goal === 'Other' && !this.character.otherGoal) {
        return false
      }
      else {
        return true
      }
    },
    characterDone () {
      return (
        this.character.style &&
        this.character.role &&
        this.character.name &&
        this.goalSet
      ) ? true : false
    }
  },
  methods: {
    decrement (field, min) {
      // minus button
      if (this[field] === min) return
      this[field]--
    },
    increment (field, max) {
      // plus button
      if (this[field] === max) return
      this[field]++
    },
  },
  watch: {
    // save target number to local storage on change
    targetNumber: function (newNumber, oldNumber) {
      if (newNumber === oldNumber) return
      localStorage.setItem('targetNumber', newNumber)
    },
    // save character to local storage on change
    character: {
      deep: true,
      handler () {
        localStorage.setItem('character', JSON.stringify(this.character))
      }
    },
  },
  mounted () {
    // load data from local storage if available
    const number = localStorage.getItem('targetNumber')
    if (number) {
      this.targetNumber = number
      // alert the user
      this.alert.text = `Loaded your most recent character number (${number}).`
      this.alert.show = true
    }
    const character = localStorage.getItem('character')
    if (character) {
      this.character = JSON.parse(character)
    }
  },
}
</script>
<style lang="scss" scoped>
.overline {
  display: flex;
  align-items: center;
  & > span {
    margin-right: 12px;
  }
}
</style>