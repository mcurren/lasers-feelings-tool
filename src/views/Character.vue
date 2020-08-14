<template>
  <div class="character">
    <!-- form fields go here... -->
  </div>
</template>
<script>
export default {
  name: 'Mission',
  data: () => ({
    character: {
      style: null,
      role: null,
      number: 3,
      name: null,
      goal: null,
    },
    computed: {
      targetNumber () {
        // save this to separate field in local storage
        return this.character.number
      }
    },
  }),
}
</script>