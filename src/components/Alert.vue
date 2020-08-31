<template>
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
</template>

<script>
export default {
  name: 'Alert',
  props: {

  },
  methods: {
    
  },
}
</script>