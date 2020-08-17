<template>
  <div class="game">
    <section class="mb-2">
      <v-card
        flat
        shaped
        elevation="0"
        class="mb-0">
        <v-card-text>
          <div class="ship mb-6">
            <h2 class="text--h4 mb-4 mt-2">Create the Ship</h2>
            <p>As a group, pick two strengths and one problem for your ship.</p>
          </div>

          <div class="strengths mb-4 mt-2">
            <span class="subheading">Select two Strengths</span>
            <v-chip-group
              v-model="activeStrengths"
              multiple
              max="2"
              column
              active-class="info--text">
              <v-chip
                v-for="(item, index) in strengths" :key="index"
                class="mr-2 mb-2"
                filter
                filter-icon="mdi-checkbox-marked-circle">
                {{ item }}
              </v-chip>

            </v-chip-group>
          </div>

          <div class="weaknesses mb-2">
            <v-select
              v-model="weaknessValue"
              :items="weaknesses"
              :hint="activeWeakness.info"
              persistent-hint
              label="Select a Problem"
            ></v-select>
          </div>
        </v-card-text>
      </v-card>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CreateShip',
  data: () => ({
    strengths: [ 'Fast', 'Nimble', 'Well-Armed', 'Powerful Shields', 'Superior Sensors', 'Cloaking Device', 'Fightercraft'],
    weaknesses: [
      {
        text: 'Fuel Hog',
        info: '(always needs energy crystals)'
      },
      {
        text: 'Only One Medical Pod',
        info: '(and Captain Darcy is in it)'
      },
      {
        text: 'Horrible Circuit Breakers',
        info: '(in battle consoles tend to explode on the bridge)'
      },
      {
        text: 'Grim Reputation',
        info: '(Captain Darcy did some bad stuff in the past)'
      },
    ],
    weaknessValue: null,
    activeStrengths: [],
  }),
  computed: {
    activeWeakness () {
      const weaknesses = this.weaknesses.filter(item => item.text === this.weaknessValue)
      return (weaknesses[0]) ? weaknesses[0] : {text: null, info: null}
    },
  },
  watch: {
    // save target number to local storage on change
    activeStrengths () {
      localStorage.setItem('shipStrengths', JSON.stringify(this.activeStrengths))
    },
    weaknessValue () {
      localStorage.setItem('shipWeakness', this.weaknessValue)
    },
  },
  mounted () {
    // reset outcome from rolls
    this.$emit('updateOutcome', null)
    // load saved data from local storage
    const shipStrengths = localStorage.getItem('shipStrengths')
    if (shipStrengths) {
      this.activeStrengths = JSON.parse(shipStrengths)
    }
    const shipWeakness = localStorage.getItem('shipWeakness')
    if (shipWeakness) {
      this.weaknessValue = shipWeakness
    }
  },
}
</script>
