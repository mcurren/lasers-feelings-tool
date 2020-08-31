<template>
  <div class="character">
    <section class="mb-2">
      <v-card
        flat
        shaped
        elevation="0"
        class="mb-6">
        <v-card-title>Build a Character</v-card-title>

        <v-card-text
          class="pt-2">
          <v-select
            hide-details
            label="Select a Style"
            :items="styles"
            placeholder="Choose one"
            v-model="character.style"
            class="pt-0 mt-0"
          ></v-select>
        </v-card-text>

        <v-card-text>
          <v-select
            hide-details
            label="Select a Role"
            :items="roles"
            placeholder="Choose one"
            v-model="character.role"
            class="pt-0 mt-0"
          ></v-select>
        </v-card-text>

        <!-- <NumberSlider 
          title="Choose a Number"
          :hasTopPad="false"
          :padBottom="3"
          @numberChange="changeTargetNumber($event)"
        /> -->

        <v-card-text>
          <div class="character-number-select">
            <v-select
              hide-details
              label="Select a Number"
              :items="numbers"
              placeholder="Choose one"
              v-model="targetNumber"
              class="pt-0 mt-0"
            ></v-select>
            <Dialog>
              <p style="margin-top:1rem;">A high number means you’re better at <strong>LASERS</strong> (technology; science; cold rationality; calm, precise action).</p>
              <p>A low number means you’re better at <strong>FEELINGS</strong> (intuition; diplomacy; seduction; wild, passionate action).</p>
            </Dialog>
          </div>
        </v-card-text>

        <v-card-text>
          <v-text-field
            hide-details
            label="Enter a Name"
            placeholder="Character Name"
            v-model="character.name"
            class="pt-0 mt-0"
          ></v-text-field>
        </v-card-text>

        <v-card-text
          class="pb-8">
          <v-select
            hide-details
            label="Select a Personal Goal"
            :items="goals"
            placeholder="Choose one"
            v-model="character.goal"
            class="pt-0 mt-0"
          ></v-select>
          <v-text-field
            v-if="character.goal === 'Other'"
            hide-details
            label="Enter a Goal"
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
        <v-card-title>Ok, all set!</v-card-title>
        <v-card-subtitle>You have:</v-card-subtitle>
        <v-card-text>
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
// import NumberSlider from '@/components/NumberSlider';
import Dialog from '@/components/DialogHelp';

export default {
  name: 'Character',
  components: {
    // NumberSlider,
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
    targetNumber: '3',
    styles: ['Alien', 'Android', 'Dangerous', 'Heroic', 'Hot-Shot', 'Intrepid', 'Savvy'],
    roles: ['Doctor', 'Envoy', 'Engineer', 'Explorer', 'Pilot', 'Scientist', 'Soldier'],
    numbers: ['2', '3', '4', '5'],
    goals: ['Become Captain', 'Meet New Aliens', 'Shoot Bad Guys', 'Find New Worlds', 'Solve Weird Space Mysteries', 'Prove Yourself', 'Keep Being Awesome', 'Other'],
    alert: {
      show: false,
      text: null
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
  // methods: {
  //   changeTargetNumber (number) {
  //     this.targetNumber = number
  //   },
  // },
  watch: {
    // save target number to local storage on change
    targetNumber: function (newNum, oldNum) {
      if (newNum === oldNum) return
      // save target number to local storage on change
      localStorage.setItem('targetNumber', parseInt(newNum))
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
    // reset outcome from rolls
    this.$emit('updateOutcome', null)
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
.character-number-select {
  display: flex;
  align-items: center;
  .v-input {
    margin-right: 8px;
  }
}
</style>