<template>
  <div class="page-404">
    <section>
      <v-card>
        <v-card-title>404 - Not Found.</v-card-title>
        <v-card-text>
          <p>What now? <a href="#" @click.prevent="toggleMenu">Click here</a>.</p>
        </v-card-text>
      </v-card>
    </section>
  </div>
</template>

<script>
export default {
  name: '404',
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
