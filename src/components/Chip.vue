<template>
  <v-chip
    class="ma-2"
    :input-value="active"
    filter
    filter-icon="mdi-close-circle">
    {{ text }}
  </v-chip>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    active: {
      type: Boolean,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  // computed: {
  //   icon () {
  //     return (this.active) ? 'mdi-close-circle' : 'mdi-plus-cirlce'
  //   },
  //   color () {
  //     return (this.active) ? 'success' : ''
  //   }
  // },
  // methods: {
  //   toggleActive () {
  //     this.$emit('toggle-active')
  //   }
  // },
}
</script>
