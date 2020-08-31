<template>
  <div class="character">
    <section class="mb-2">
      <v-card
        flat
        shaped
        elevation="0"
        class="mb-6">
        <v-card-subtitle>Select a Style</v-card-subtitle>
        <v-card-text>
          <v-select
            :items="styles"
            placeholder="Choose"
            v-model="character.style"
            class="pt-0 mt-0"
          ></v-select>
        </v-card-text>

        <v-card-subtitle>Select a Role</v-card-subtitle>
        <v-card-text>
          <v-select
            :items="roles"
            placeholder="Choose"
            v-model="character.role"
            class="pt-0 mt-0"
          ></v-select>
        </v-card-text>

        <NumberSlider 
          title="Choose a Number"
          :hasTopPad="false"
          :padBottom="3"
          @numberChange="changeTargetNumber($event)"
        />

        <v-card-subtitle>Enter a Name</v-card-subtitle>
        <v-card-text>
          <v-text-field
            placeholder="Your Name"
            v-model="character.name"
            class="pt-0 mt-0"
          ></v-text-field>
        </v-card-text>

        <v-card-subtitle>Select a Personal Goal</v-card-subtitle>
        <v-card-text>
          <v-select
            :items="goals"
            placeholder="Choose your Goal"
            v-model="character.goal"
            class="pt-0 mt-0"
          ></v-select>
          <v-text-field
            v-if="character.goal === 'Other'"
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
  </div>
</template>
<script>
import NumberSlider from '@/components/NumberSlider';

export default {
  name: 'Mission',
  components: {
    NumberSlider,
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
    changeTargetNumber (number) {
      this.targetNumber = number
    },
  },
  watch: {
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