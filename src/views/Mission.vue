<template>
  <div class="mission">
    <section v-show="rolls.length">
      <v-card
        flat
        shaped
        elevation="0"
        class="mb-6">
        <v-card-text>
          <p class="text-h6">
            <span v-for="(text, index) in parts" :key="index">{{ text }} {{ options[index][rolls[index]] }} </span>
          </p>
        </v-card-text>
      </v-card>
    </section>

    <section>
      <v-btn 
        class="mb-2 mission-button"
        x-large 
        shaped
        block
        elevation="1"
        color="primary"
        @click="generate()">
        {{ buttonText }}
      </v-btn>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Mission',
  data: () => ({
    parts: [
      '',
      'want(s) to',
      'the',
      'which will',
    ],
    options: [
      // a threat...
      [
        'Zorgon the Conqueror',
        'The Hive Armada',
        'A Rogue Captain',
        'Space Pirates',
        'Cyber Zombies',
        'Alien Brain Worms',
      ],
      // wants to...
      [
        'destroy/corrupt',
        'steal/capture',
        'bond with',
        'protect/empower',
        'build/synthesize',
        'pacify/occupy',
      ],
      // the...
      [
        'Space Pirate King/Queen',
        'Void Crystals',
        'Star Dreadnought',
        'Quantum Tunnel',
        'Ancient Space Ruin',
        'Alien Artifact',
      ],
      // which will...
      [
        'destroy a solar system ',
        'reverse time ',
        'enslave a planet ',
        'start a war / invasion',
        'rip a hole in reality',
        'fix everything',
      ],
    ],
    rolls: [],
  }),
  computed: {
    buttonText () {
      return (this.rolls.length) ? 'Generate New Mission' : 'Generate A Mission'
    },
  },
  methods: {
    generate () {
      // clear current rolls
      this.rolls = []
      // roll 4d6
      for (let step = 0; step < 5; step++) {
        this.rolls.push(0 + Math.floor(Math.random() * 5))
      }
    },
  },
  watch: {
    // save current rolls to local storage
    rolls: function (newArr, oldArr) {
      if (newArr === oldArr) return
      localStorage.setItem('missionRolls', JSON.stringify(newArr))
    },
  },
  mounted () {
    // reset outcome from rolls
    this.$emit('updateOutcome', null)
    // load data from local storage if available
    const arr = JSON.parse(localStorage.getItem('missionRolls'))
    if (arr) {
      this.rolls = arr
    }
  },
}
</script>
