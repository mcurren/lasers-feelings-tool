<template>
  <div class="game">
    <section class="mb-2">
      <v-card
        flat
        shaped
        elevation="0"
        class="mb-0">
        <v-card-title>How To Run The Game</v-card-title>
        <v-card-text>
          <p>Play to find out how they defeat the threat. Introduce the threat by showing evidence of its recent badness. Before a threat does something to the characters, show signs that it’s about to happen, then ask them what they do.</p>
          <blockquote>
            <p>“Zorgon charges the megacannons on his ship. What do you do?”</p>
          </blockquote>
          <blockquote>
            <p>“Daneela pours you a glass of Arcturan whiskey and slips her arm around your waist. What do you do?”</p>
          </blockquote>
          <p>Call for a roll when the situation is uncertain. Don’t pre-plan outcomes—let the chips fall where they may.</p>
          <p>Use failures to push the action forward. The situation always changes after a roll, for good or ill.</p>
          <p>Ask questions and build on the answers.</p>
          <blockquote>
            <p>“Have any of you encountered a Void Cultist before? Where? What happened?”</p>
          </blockquote>
        </v-card-text>
      </v-card>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RunGame',
  mounted () {
    // reset outcome from rolls
    this.$emit('updateOutcome', null)
  },
}
</script>

<style lang="scss" scoped>
p {
  font-size: 0.95rem;
  line-height: 1.5;
}
blockquote {
  padding: 0 0.5em;
  opacity: 0.9;
  p {
    font-style: italic;
  }
}
</style>