<template>
  <div class="home">
    <RollDice @updateOutcome="updateOutcome"/>
  </div>
</template>

<script>
import RollDice from '@/components/RollDice.vue'

export default {
  name: 'Home',
  components: {
    RollDice
  },
  methods: {
    updateOutcome (outcome) {
      this.$emit('updateOutcome', outcome)
    },
  },
}
</script>
