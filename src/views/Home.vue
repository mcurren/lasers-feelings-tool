<template>
  <div class="home text-left text-sm-center">
    <section class="mb-2">
      <v-card
        flat
        shaped
        elevation="0"
        class="mb-6">
        <v-card-text>
          <header>
            <h1 class="text-h3 primary--text mb-4 mt-2 mb-sm-7 mt-sm-4">
              <span class="lasers">Lasers</span> <span class="amp">&amp;</span> <span class="feelings">Feelings</span>
            </h1>
            <div class="text-h6 text-sm-h5  mb-3">You Are The Crew Of The Interstellar Scout Ship <strong>Raptor</strong>.</div>
          </header>
          <img src="../assets/icon-512px.png" alt="Laser & Feelings Spaceship">
          <p class="text-body-1">Your mission is to explore uncharted regions of space, deal with aliens both friendly and deadly, and defend the Consortium worlds against space dangers.</p>
          <p class="text-body-1"><strong>Captain Darcy</strong> has been overcome by the strange psychic entity known as Something Else, leaving you to fend for yourselves while he recovers in a medical pod.</p>
          <p>What now? <a href="#" @click.prevent="toggleMenu">Click here</a>.</p>
        </v-card-text>
      </v-card>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    toggleMenu () {
      this.$emit('toggleMenu')
    },
  },
  mounted () {
    // reset outcome from rolls
    this.$emit('updateOutcome', null)
  },
}
</script>
<style lang="scss" scoped>
// .intro-text {
//   text-align: center;
// }
h1 {
  text-transform: uppercase;
  font-weight: 600 !important;
  line-height: 1 !important;
  @media (min-width: 600px) {
    line-height: 0.6 !important;
    span {
      display: block;
      position: relative;
      z-index: 1;
    }
  }
  .lasers {
    opacity: 0.9;
  }
  .amp {
    opacity: 0.5;
    transform: rotate(10deg);
    transform-origin: center;
    @media (min-width: 600px) {
      // margin: -0.55em 0;
      display: inline-block;
      font-size: 0.95em;
      z-index: 5;
      position: relative;
    }
  }
  .feelings {
    opacity: 0.8;
  }
}
.text-h3 {
  @media (min-width: 600px) {
    font-size: 4em !important;
    line-height: 3.75rem;
  }
}
img {
  display: block;
  width: 300px;
  margin: 1.5em auto 2em;
  // padding: 0 1em;
  // transform: rotate(5deg);
}
</style>
