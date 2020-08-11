<template>
  <v-dialog 
    v-model="dialog" 
    scrollable 
    max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        fab
        x-small
        elevation="0"
        v-bind="attrs"
        color="transparent"
        v-on="on">
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card
      tile>
      <v-card-text>
        <p style="margin-top:1rem;">When you do something risky, roll <strong>1d6</strong> to find out how it goes. Roll <strong>+1d</strong> if you’re <strong>prepared</strong> and <strong>+1d</strong> if you’re an <strong>expert</strong>.</p>
        <p><em>The GM tells you how many dice to roll, based on your character and the situation.</em></p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'DiceDialog',
    data: () => ({
      dialog: false,
    }),
  }
</script>